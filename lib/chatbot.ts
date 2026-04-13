// ═══════════════════════════════════════════════════════════════
// ATDC WhatsApp AI Chatbot — Human-like, Multi-language
// ═══════════════════════════════════════════════════════════════
import { appendBooking, appendHomeCollection, appendContactMessage } from './sheets';
import { sendWhatsAppMessage } from './whatsapp';

type ChatState =
  | 'IDLE'
  | 'APPT_NAME' | 'APPT_PHONE' | 'APPT_DEPT' | 'APPT_DATE' | 'APPT_SLOT'
  | 'HC_NAME' | 'HC_PHONE' | 'HC_ADDRESS' | 'HC_TESTS' | 'HC_DATE' | 'HC_TIME'
  | 'CR_NAME' | 'CR_PHONE' | 'CR_EMAIL' | 'CR_MSG';

type Language = 'english' | 'hindi' | 'gujarati' | 'hinglish';

interface UserSession {
  state: ChatState;
  lang: Language;
  data: Record<string, string>;
  lastUpdate: number;
}

const sessions = new Map<string, UserSession>();

function cleanupSessions() {
  const now = Date.now();
  for (const [k, s] of sessions.entries()) {
    if (now - s.lastUpdate > 2 * 60 * 60 * 1000) sessions.delete(k);
  }
}

function getSession(phone: string): UserSession {
  cleanupSessions();
  if (!sessions.has(phone)) {
    sessions.set(phone, { state: 'IDLE', lang: 'english', data: {}, lastUpdate: Date.now() });
  }
  return sessions.get(phone)!;
}

function updateSession(phone: string, update: Partial<UserSession>) {
  const cur = getSession(phone);
  sessions.set(phone, { ...cur, ...update, data: { ...cur.data, ...(update.data || {}) }, lastUpdate: Date.now() });
}

function resetSession(phone: string) { sessions.delete(phone); }

// ── Language detection ────────────────────────────────────────
function detectLanguage(text: string): Language {
  if (/[\u0900-\u097F]/.test(text)) return 'hindi';
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gujarati';
  const hinglish = ['kya', 'hai', 'mujhe', 'haan', 'nahi', 'acha', 'theek', 'chalega',
    'chahiye', 'bhai', 'yaar', 'sahi', 'kal', 'aaj', 'me', 'mera', 'karo', 'batao',
    'kitna', 'kab', 'kaise', 'kyun', 'thoda', 'accha', 'bilkul'];
  const words = text.toLowerCase().split(/\s+/);
  return words.some(w => hinglish.includes(w)) ? 'hinglish' : 'english';
}

// ── Flexible matchers ─────────────────────────────────────────
function matchDept(input: string): string | null {
  const m = input.toLowerCase();
  if (/path|blood|lab|1\b|khoon|rakt/.test(m)) return 'Pathology';
  if (/radio|xray|x-ray|scan|mri|ultra|sono|2\b/.test(m)) return 'Radiology';
  if (/cardio|heart|ecg|dil|3\b/.test(m)) return 'Cardiology';
  if (/general|4\b|other|checkup|saamanya|aam/.test(m)) return 'General';
  return null;
}

function matchSlot(input: string): string | null {
  const m = input.toLowerCase();
  if (/morning|subah|savare|1\b|9\s*am/.test(m)) return 'Morning (9 AM - 12 PM)';
  if (/afternoon|dopahar|duphar|2\b|1\s*pm|noon/.test(m)) return 'Afternoon (1 PM - 4 PM)';
  if (/evening|shaam|sham|3\b|5\s*pm|sanje/.test(m)) return 'Evening (5 PM - 8 PM)';
  return null;
}

function matchTime(input: string): string | null {
  const m = input.toLowerCase();
  if (/morning|subah|1\b|9\s*am|early/.test(m)) return 'Morning (8 AM - 11 AM)';
  if (/afternoon|dopahar|2\b|11\s*am|noon|12/.test(m)) return 'Afternoon (11 AM - 2 PM)';
  if (/evening|shaam|3\b|2\s*pm|sanje/.test(m)) return 'Evening (2 PM - 5 PM)';
  return null;
}

// ── Branch map links ──────────────────────────────────────────
const BRANCHES = [
  { name: 'Udhna (Main – 24/7)', map: 'https://maps.google.com/?q=ATDC+Udhna+Main+Road+Surat', addr: 'Near Railway Station, Udhna Main Rd' },
  { name: 'Pandesara', map: 'https://maps.google.com/?q=ATDC+Pandesara+Surat', addr: 'GIDC Industrial Estate, Near Fire Station' },
  { name: 'Bhestan', map: 'https://maps.google.com/?q=ATDC+Bhestan+Surat', addr: 'Near Bhestan Crossroads, Main Road' },
  { name: 'Sachin', map: 'https://maps.google.com/?q=ATDC+Sachin+Surat', addr: 'Industrial Hub Area, Opp. Market Yard' },
  { name: 'Godadara', map: 'https://maps.google.com/?q=ATDC+Godadara+Surat', addr: 'Shyam Dham Society Area, Godadara Rd' },
];

// ── Gemini AI context ─────────────────────────────────────────
const SYSTEM_PROMPT = `You are the AI Assistant of Acharya Tulsi Diagnostic Centre (ATDC), Surat, Gujarat.

PERSONALITY:
- Speak in a highly professional, clinical, and respectful tone.
- Do not use names like "Priya". You are "AI Assistant of ATDC".
- Maintain formal structure; avoid excessive emojis.
- Provide clear, direct, and concise operational instructions.
- If the user writes in Hindi or Gujarati, respond formally in that language without slang.
- Keep responses concise but complete (under 150 words).

ATDC FACTS:
- 5 branches in Surat: Udhna (HQ, 24/7), Pandesara (8AM-9PM), Bhestan, Sachin, Godadara.
- Services: Pathology, Radiology, Cardiology, General checkup.
- Phone: 0261-227-7119 | Email: udhnatyp@gmail.com
- To book an appointment, the user should type "book".
- To schedule a home collection, type "home collection".
- To submit a contact request, type "contact request".

IMPORTANT: Do NOT make up test prices or medical advice. Direct specific medical questions to doctors.
If the user wants to book, say: "Please type *book* to initiate your scheduling."
If they want a home collection, say: "Please type *home collection* to arrange a visit."`;

async function aiReply(userMsg: string, session: UserSession): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return keywordFallback(userMsg);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: userMsg }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 200 },
        }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text.trim();
    }
  } catch (e) { console.error('Gemini error:', e); }

  return keywordFallback(userMsg);
}

function keywordFallback(msg: string): string {
  const m = msg.toLowerCase();
  if (/hour|time|open|timing|schedule/.test(m))
    return 'ATDC operating hours: Mon-Sun, 7 AM - 9 PM across all branches. The Udhna branch operates 24/7.';
  if (/home|visit|collect/.test(m))
    return 'ATDC offers 24/7 home sample collection across Surat. Please type *home collection* to initiate a booking.';
  if (/price|cost|rate|charge|kitna/.test(m))
    return 'For test pricing, please visit our website at /test-prices or contact our support team at 0261-227-7119.';
  if (/branch|location|address|where|kahan/.test(m))
    return branchList();
  if (/report|result/.test(m))
    return 'Reports are typically generated within 24 hours. Please retain your receipt for collection or call 0261-227-7119.';
  if (/doctor|specialist/.test(m))
    return 'ATDC employs specialists in Pathology, Radiology, and Cardiology. Type *book* to schedule an appointment.';
  if (/email|mail/.test(m))
    return 'You may reach us via email at udhnatyp@gmail.com. We intend to respond within 1 business day.';
  if (/contact|phone|call|number/.test(m))
    return '📞 0261-227-7119\n📧 udhnatyp@gmail.com\n\nYou may also visit any of our 5 branches in Surat. We are here to assist you.';
  return 'How may I assist you today?\n(I can assist in English, Hindi, and Gujarati)\n\n📅 Type *book* – Schedule an appointment\n🏠 Type *home collection* – Arrange a sample pickup\n✉️ Type *contact request* – Submit an inquiry\n📍 Type *branches* – View our locations\n\nYou may also type any general medical questions regarding our services.';
}

function branchList(): string {
  return `ATDC operates 5 branches across Surat:\n\n` +
    BRANCHES.map(b => `📍 *${b.name}*\n${b.addr}\n🗺 ${b.map}`).join('\n\n') +
    `\n\nCentral Helpline: 0261-227-7119`;
}

function welcomeMsg(lang: Language): string {
  if (lang === 'hindi')
    return `नमस्ते। मैं ATDC की AI असिस्टेंट हूं। मैं हिंदी, अंग्रेजी और गुजराती में बात कर सकती हूं।\n\nकृप्या अपनी जरूरत चुनें:\n\n📅 अपॉइंटमेंट बुक करें – *book* टाइप करें\n🏠 होम कलेक्शन – *home collection* टाइप करें\n✉️ संपर्क करें – *contact request* टाइप करें\n📍 हमारी ब्रांच – *branches* टाइप करें\n\nआप हमारी सेवाओं से संबंधित कोई भी सामान्य प्रश्न सीधे लिखकर पूछ सकते हैं।`;
  if (lang === 'gujarati')
    return `નમસ્તે. હું ATDC ની AI આસિસ્ટન્ટ છું. હું ગુજરાતી, હિન્દી અને અંગ્રેજીમાં વાત કરી શકું છું.\n\nકૃપા કરીને તમારી જરૂરિયાત પસંદ કરો:\n\n📅 અપોઇન્ટમેન્ટ – *book* ટાઇપ કરો\n🏠 હોમ કલેક્શન – *home collection* ટાઇપ કરો\n✉️ સંપર્ક – *contact request* ટાઇપ કરો\n📍 અમારી શાખાઓ – *branches* ટાઇપ કરો\n\nતમે અમારી સેવાઓ વિશેના અન્ય સામાન્ય પ્રશ્નો પણ સીધા ટાઇપ કરીને પૂછી શકો છો.`;
  if (lang === 'hinglish')
    return `Namaste. Main ATDC ki AI Assistant hoon. Main English, Hindi aur Gujarati mein baat kar sakti hoon.\n\nKripya apni zaroorat chunen:\n\n📅 Appointment – *book* likhein\n🏠 Home collection – *home collection* likhein\n✉️ Contact Request – *contact request* likhein\n📍 Branches – *branches* likhein\n\nAap hamari services ke bare mein koi bhi general sawal ya inquiry bhi likh kar poochh sakte hain.`;
  return `Hello. I am the AI Assistant for ATDC. I can converse in English, Hindi, and Gujarati.\n\nHow may I assist you today?\n\n📅 *Book appointment* – type "book"\n🏠 *Home collection* – type "home collection"\n✉️ *Contact Request* – type "contact request"\n📍 *Find a branch* – type "branches"\n\nYou may also ask me any general questions regarding our services by typing them directly.`;
}

// ── Date parsing & validation ────────────────────────────────
function parseInputDate(input: string, maxAdvanceDays: number): string | null | 'TOO_LATE' {
  const mLocal = input.toLowerCase().trim();
  const now = new Date();
  
  const cutOffHour = 17; // 5:00 PM cutoff for same-day
  let minOffset = 0;
  if (now.getHours() >= cutOffHour) {
    minOffset = 1;
  }

  if (/today|aaj/i.test(mLocal)) {
    if (minOffset > 0) return 'TOO_LATE'; // Reject today if cut-off passed
    return now.toISOString().split('T')[0];
  }
  if (/tomorrow|kal/i.test(mLocal)) {
    const tmrw = new Date(now);
    tmrw.setDate(now.getDate() + 1);
    return tmrw.toISOString().split('T')[0];
  }

  const m = mLocal.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  const m2 = mLocal.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  
  let d: Date;
  if (m) d = new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1]));
  else if (m2) d = new Date(parseInt(m2[1]), parseInt(m2[2]) - 1, parseInt(m2[3]));
  else return null;

  const currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((d.getTime() - currentStart.getTime()) / (1000 * 3600 * 24));

  if (diffDays < minOffset) return 'TOO_LATE';
  if (diffDays > maxAdvanceDays) return null;
  
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}

// ═══════════════════════════════════════════════════════════════
// Main Handler
// ═══════════════════════════════════════════════════════════════
export async function handleUserMessage(phone: string, text: string): Promise<string> {
  const session = getSession(phone);
  const msgLower = text.toLowerCase().trim();

  // Auto-detect language unless already set explicitly
  const detectedLang = detectLanguage(text);
  if (detectedLang !== 'english' && session.lang === 'english') {
    updateSession(phone, { lang: detectedLang });
  }
  const lang = (session.lang !== 'english') ? session.lang : detectedLang;

  // ── Global shortcuts ───────────────────────────────────────
  if (/^(reset|cancel|restart|stop|quit|exit)$/i.test(msgLower)) {
    resetSession(phone);
    return 'Session reset successfully. Type *hi* to view the main menu.';
  }
  if (/^(hi|hii|hiii|hello|hey|namaste|namaskar|kem cho|start|menu|help)$/i.test(msgLower)) {
    updateSession(phone, { lang, state: 'IDLE', data: {} });
    return welcomeMsg(lang);
  }
  if (/\bbranche?s?\b|locations?|kahan|branches/i.test(msgLower) && session.state === 'IDLE') {
    return branchList();
  }
  if (/\btiming|open|hours?\b/i.test(msgLower) && session.state === 'IDLE') {
    return '🕐 *ATDC Branch Timings:*\n\n• *Udhna (Main):* Open 24/7\n• All other branches: *7:00 AM – 9:00 PM*, Mon–Sun\n\nNeed directions? Type *branches* for maps! 📍';
  }
  if (/\bcontact\b/i.test(msgLower) && session.state === 'IDLE') {
    return '📞 *0261-227-7119*\n📧 *udhnatyp@gmail.com*\n🌐 Website: /contact\n\nOr visit any of our 5 branches — we\'d love to see you! 😊';
  }

  // ── Trigger: appointment booking ───────────────────────────
  if ((session.state === 'IDLE') && /\bbook\b|appointment|appoint|ment|schedule|reserve/i.test(msgLower)
      && !/home|ghar|collect|pickup/i.test(msgLower)) {
    updateSession(phone, { state: 'APPT_NAME', data: {} });
    if (lang === 'hindi')
      return `अपॉइंटमेंट बुकिंग शुरू कर रहे हैं।\n\nकृपया अपना पूरा नाम बताएं।`;
    if (lang === 'hinglish')
      return `Appointment booking initiate kar rahe hain.\n\nKripya apna poora naam batayein.`;
    return `Initiating appointment booking.\n\nPlease provide your *full name*.`;
  }

  // ── Trigger: home collection ───────────────────────────────
  if ((session.state === 'IDLE') && /home|ghar|collect|pickup|visit|aana|sample|nahi aana|nai aana/i.test(msgLower)) {
    updateSession(phone, { state: 'HC_NAME', data: {} });
    if (lang === 'hindi')
      return `होम कलेक्शन अनुरोध शुरू कर रहे हैं।\n\nकृपया अपना पूरा नाम बताएं।`;
    if (lang === 'hinglish')
      return `Home collection request initiate kar rahe hain.\n\nKripya apna poora naam batayein.`;
    return `Initiating home collection request.\n\nPlease provide your *full name*.`;
  }

  // ── Trigger: contact request ───────────────────────────────
  if ((session.state === 'IDLE') && /\bcontact\b|inquiry|request/i.test(msgLower) && !/book|home/i.test(msgLower)) {
    updateSession(phone, { state: 'CR_NAME', data: {} });
    if (lang === 'hindi') return `आपका संपर्क अनुरोध शुरू कर रहे हैं।\n\nकृपया अपना पूरा नाम बताएं।`;
    if (lang === 'hinglish') return `Aapka contact request initiate kar rahe hain.\n\nKripya apna poora naam batayein.`;
    return `Initiating your contact request.\n\nPlease specify your *full name*.`;
  }

  // ═══ State machine ════════════════════════════════════════
  const { state, data } = session;

  // ── APPOINTMENT FLOW ───────────────────────────────────────
  if (state === 'APPT_NAME') {
    if (text.trim().length < 2) return 'Please provide your full name.';
    const name = text.trim();
    updateSession(phone, { state: 'APPT_PHONE', data: { name } });
    if (lang === 'hindi') return `नाम दर्ज किया गया। कृपया अपना फोन नंबर दें।`;
    if (lang === 'hinglish') return `Naam note kar liya gaya. Kripya apna phone number dijiye, ${name}.`;
    return `Name recorded. Please specify your *contact number*.`;
  }

  if (state === 'APPT_PHONE') {
    const digits = text.replace(/\D/g, '');
    if (digits.length < 10) {
      return lang === 'hindi' ? 'कृपया सही 10 अंकों का नंबर दें।'
        : 'Please share a valid 10-digit phone number.';
    }
    updateSession(phone, { state: 'APPT_DEPT', data: { phone: digits } });
    if (lang === 'hindi')
      return `✅ धन्यवाद। कृपया अपना *विभाग* चुनें:\n\n1️⃣ पैथोलॉजी (खून की जांच)\n2️⃣ रेडियोलॉजी (X-Ray, स्कैन)\n3️⃣ कार्डियोलॉजी (हृदय)\n4️⃣ सामान्य जांच`;
    if (lang === 'hinglish')
      return `✅ Thank you. Please select your *department*:\n\n1️⃣ Pathology (blood tests)\n2️⃣ Radiology (X-Ray, Scan)\n3️⃣ Cardiology (heart)\n4️⃣ General checkup`;
    return `✅ Thank you. Please select your preferred *department*:\n\n1️⃣ Pathology (blood tests)\n2️⃣ Radiology (X-Ray, MRI, Scan)\n3️⃣ Cardiology (ECG, heart)\n4️⃣ General checkup`;
  }

  if (state === 'APPT_DEPT') {
    const dept = matchDept(text);
    if (!dept) {
      return lang === 'hindi' ? 'कृपया 1, 2, 3 या 4 में से चुनें।'
        : 'Please reply with 1, 2, 3, or 4 to select your department.';
    }
    updateSession(phone, { state: 'APPT_DATE', data: { department: dept } });
    if (lang === 'hindi')
      return `विभाग: *${dept}*।\n\nआप किस तारीख को अपॉइंटमेंट चाहते हैं? (DD/MM/YYYY या 'आज'/'कल')`;
    if (lang === 'hinglish')
      return `Department: *${dept}*.\n\nWhich date would you like to book? (DD/MM/YYYY or 'today'/'tomorrow')`;
    return `Department: *${dept}*.\n\nWhich date would you like to book? (DD/MM/YYYY or 'today'/'tomorrow')`;
  }

  if (state === 'APPT_DATE') {
    const formattedDate = parseInputDate(text, 7);
    if (formattedDate === 'TOO_LATE') {
      return lang === 'hindi' ? 'आज के लिए अपॉइंटमेंट बुकिंग बंद हो गई है (शाम 5 बजे के बाद)। कृपया कल या किसी अन्य तारीख को चुनें।'
        : 'Same-day bookings are closed after 5:00 PM. Please select tomorrow or another date.';
    }
    if (!formattedDate) {
      return lang === 'hindi' ? 'कृपया एक वैध तारीख दर्ज करें (अगले 7 दिनों के भीतर)।'
        : 'Please provide a valid date (within the next 7 days). E.g. 20/04/2026';
    }
    updateSession(phone, { state: 'APPT_SLOT', data: { date: formattedDate } });
    if (lang === 'hindi')
      return `Date noted: ${formattedDate}.\n\nKaunsa time slot prefer karenge?\n\n1️⃣ Morning (9 AM – 12 PM)\n2️⃣ Afternoon (1 PM – 4 PM)\n3️⃣ Evening (5 PM – 8 PM)`;
    return `Date recorded: ${formattedDate}.\n\nWhich time slot do you prefer?\n\n1️⃣ Morning (9 AM – 12 PM)\n2️⃣ Afternoon (1 PM – 4 PM)\n3️⃣ Evening (5 PM – 8 PM)`;
  }

  if (state === 'APPT_SLOT') {
    const slot = matchSlot(text);
    if (!slot) {
      return lang === 'hindi' ? 'कृपया 1 (सुबह), 2 (दोपहर), या 3 (शाम) चुनें।'
        : 'Please choose 1 (Morning), 2 (Afternoon), or 3 (Evening).';
    }
    const fd = data as Record<string, string>;
    try {
      await appendBooking({
        name: fd['name'], phone: fd['phone'] || phone,
        department: fd['department'], doctor: 'To be assigned',
        date: fd['date'], slot, message: 'Booked via WhatsApp',
      });
      // Try notify admin
      try {
        const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;
        if (adminNumber) {
          const msg = `📅 *New Booking Request (WhatsApp)*\n👤 *Patient:* ${fd['name']}\n📞 *Phone:* ${fd['phone'] || phone}\n🏥 *Dept:* ${fd['department']}\n📅 *Date:* ${fd['date']}\n⏰ *Slot:* ${slot}`;
          await sendWhatsAppMessage(adminNumber, { type: 'text', text: { body: msg } });
        }
      } catch (e) { console.error('Admin notify failed', e) }
      
      const success = true;
      if (success) {
        resetSession(phone);
        if (lang === 'hindi')
          return `🎉 *बुकिंग हो गई!*\n\n👤 ${fd['name']}\n🏥 ${fd['department']}\n📅 ${fd['date']}\n⏰ ${slot}\n\nहमारा स्टाफ जल्द ही कन्फर्म करेगा और आपको यहां WhatsApp पर बताएगा। 😊\n\nकोई जरूरी काम हो तो: *0261-227-7119*`;
        if (lang === 'hinglish')
          return `🎉 *Booking ho gayi!*\n\n👤 ${fd['name']}\n🏥 ${fd['department']}\n📅 ${fd['date']}\n⏰ ${slot}\n\nHamara staff jald confirm karega aur aapko WhatsApp pe batayega. 😊\nUrgent: *0261-227-7119*`;
        return `🎉 *You're all set, ${fd['name']}!*\n\n*Booking Summary:*\n🏥 ${fd['department']}\n📅 ${fd['date']}\n⏰ ${slot}\n\nOur team will confirm your appointment shortly and notify you right here. 😊\n\nNeed anything urgent? Call *0261-227-7119*`;
      }
    } catch (e) { console.error('Booking error:', e); }
    resetSession(phone);
    return `Hmm, something went sideways on our end. 😔 Please call us at *0261-227-7119* and we'll book you in right away!`;
  }

  // ── HOME COLLECTION FLOW ───────────────────────────────────
  if (state === 'HC_NAME') {
    if (text.trim().length < 2) return 'Please provide your full name for the home collection.';
    updateSession(phone, { state: 'HC_PHONE', data: { name: text.trim() } });
    if (lang === 'hindi') return `नाम दर्ज किया गया। कृपया अपना फोन नंबर दें।`;
    if (lang === 'hinglish') return `Naam note kar liya gaya. Aapka phone number kya hai?`;
    return `Name recorded. Please specify your *contact number*.`;
  }

  if (state === 'HC_PHONE') {
    const digits = text.replace(/\D/g, '');
    if (digits.length < 10) return 'Please provide a valid 10-digit phone number.';
    updateSession(phone, { state: 'HC_ADDRESS', data: { phone: digits } });
    if (lang === 'hindi') return `कृपया अपना पूरा पता (मकान नंबर, एरिया, और लैंडमार्क) बताएं।`;
    if (lang === 'hinglish') return `Kripya apna poora address (area aur landmark ke saath) batayein.`;
    return `Contact recorded. Please provide your *complete address* for the collection, including area and landmark.`;
  }

  if (state === 'HC_ADDRESS') {
    if (text.trim().length < 5) return 'Please provide a complete address.';
    updateSession(phone, { state: 'HC_TESTS', data: { address: text.trim() } });
    if (lang === 'hindi') return `पता नोट किया गया। कृपया आवश्यक टेस्ट बताएं (उदाहरण: CBC, Sugar)। यदि स्पष्ट नहीं है तो 'not sure' लिखें।`;
    if (lang === 'hinglish') return `Address note kar liya. Kaunse tests karwane hain? Pata nahi toh "not sure" likhein.`;
    return `Address logged. Which *tests* are required? (e.g., CBC, Blood Sugar).\nIf unsure, please state 'not sure'.`;
  }

  if (state === 'HC_TESTS') {
    updateSession(phone, { state: 'HC_DATE', data: { tests: text.trim() } });
    if (lang === 'hindi') return `टेस्ट नोट किए गए। आप होम कलेक्शन के लिए कौन सी तारीख चाहते हैं? (DD/MM/YYYY या 'आज'/'कल')`;
    if (lang === 'hinglish') return `Tests noted. Kis date ko collection karwana hai? (DD/MM/YYYY ya 'today'/'tomorrow')`;
    return `Tests recorded. Please provide the *preferred date* for your home collection.\n_(Format: DD/MM/YYYY or 'today'/'tomorrow')_`;
  }

  if (state === 'HC_DATE') {
    const formattedDate = parseInputDate(text, 2);
    if (formattedDate === 'TOO_LATE') {
      return lang === 'hindi' ? 'आज के लिए होम कलेक्शन बुकिंग बंद हो गई है (शाम 5 बजे के बाद)। कृपया कल को चुनें।'
        : 'Same-day collections are closed after 5:00 PM. Please schedule for tomorrow instead.';
    }
    if (!formattedDate) {
      return lang === 'hindi' ? 'कृपया एक वैध तारीख दर्ज करें (केवल आज और कल अनुमत हैं)।'
        : 'Please provide a valid date format (only today and tomorrow are permitted). E.g. 20/04/2026';
    }
    updateSession(phone, { state: 'HC_TIME', data: { date: formattedDate } });
    if (lang === 'hindi') return `तारीख: ${formattedDate}। कृपया समय चुनें:\n\n1️⃣ सुबह (8 AM – 11 AM)\n2️⃣ दोपहर (11 AM – 2 PM)\n3️⃣ शाम (2 PM – 5 PM)`;
    if (lang === 'hinglish') return `Date: ${formattedDate}। Time slot chunein:\n\n1️⃣ Subah (8 AM – 11 AM)\n2️⃣ Dopahar (11 AM – 2 PM)\n3️⃣ Sham (2 PM – 5 PM)`;
    return `Date: ${formattedDate}.\n\nWhich *time slot* do you prefer?\n\n1️⃣ Morning (8 AM – 11 AM)\n2️⃣ Mid-day (11 AM – 2 PM)\n3️⃣ Afternoon (2 PM – 5 PM)`;
  }

  if (state === 'HC_TIME') {
    const timeSlot = matchTime(text);
    if (!timeSlot) return 'Please choose 1 (Morning), 2 (Mid-day), or 3 (Afternoon).';
    const fd = data as Record<string, string>;
    try {
      await appendHomeCollection({
        name: fd['name'], phone: fd['phone'] || phone,
        address: fd['address'], tests: fd['tests'] || 'Not specified',
        date: fd['date'], timeSlot, source: 'WhatsApp Bot',
      });
      // Try notify admin
      try {
        const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;
        if (adminNumber) {
          const msg = `🏠 *New Home Collection Request (WhatsApp)*\n👤 *Patient:* ${fd['name']}\n📞 *Phone:* ${fd['phone'] || phone}\n📍 *Address:* ${fd['address']}\n🧪 *Tests:* ${fd['tests']}\n📅 *Date:* ${fd['date']}\n⏰ *Slot:* ${timeSlot}`;
          await sendWhatsAppMessage(adminNumber, { type: 'text', text: { body: msg } });
        }
      } catch (e) { console.error('Admin notify failed', e) }

      const success = true;
      if (success) {
        resetSession(phone);
        if (lang === 'hindi')
          return `होम कलेक्शन अनुरोध पुष्टि:\n\n👤 ${fd['name']}\n📍 ${fd['address']}\n🧪 ${fd['tests']}\n📅 ${fd['date']}\n⏰ ${timeSlot}\n\nहमारी टीम समय पर पहुंचेगी।\nसहायता: 0261-227-7119`;
        if (lang === 'hinglish')
          return `Home collection request confirmed:\n\n👤 ${fd['name']}\n📍 ${fd['address']}\n🧪 ${fd['tests']}\n📅 ${fd['date']}\n⏰ ${timeSlot}\n\nHamari team samay par pahuchegi.\nHelpline: 0261-227-7119`;
        return `Home Collection Summary:\n\n👤 ${fd['name']}\n📍 ${fd['address']}\n🧪 ${fd['tests']}\n📅 ${fd['date']}\n⏰ ${timeSlot}\n\nOur phlebotomist will arrive as scheduled.\nFor emergencies: 0261-227-7119`;
      }
    } catch (e) { console.error('HC error:', e); }
    resetSession(phone);
    return `An error occurred while processing your request. Please contact 0261-227-7119 directly.`;
  }

  // ── CONTACT REQUEST FLOW ───────────────────────────────────
  if (state === 'CR_NAME') {
    if (text.trim().length < 2) return 'Please provide a valid full name.';
    updateSession(phone, { state: 'CR_PHONE', data: { name: text.trim() } });
    if (lang === 'hindi') return `धन्यवाद। कृपया अपना फोन नंबर प्रदान करें।`;
    if (lang === 'hinglish') return `Dhanyavaad. Kripya apna phone number dijiye.`;
    return `Thank you. Please provide your contact number.`;
  }

  if (state === 'CR_PHONE') {
    const digits = text.replace(/\D/g, '');
    if (digits.length < 10) return 'Please provide a valid 10-digit phone number.';
    updateSession(phone, { state: 'CR_EMAIL', data: { phone: digits } });
    if (lang === 'hindi') return `नोट किया गया। कृपया अपना ईमेल एड्रेस बताएं। (या 'skip' लिखें)`;
    if (lang === 'hinglish') return `Noted. Kripya apna email address batayein. (Ya 'skip' likhein)`;
    return `Noted. Please provide your email address. (Or type 'skip')`;
  }

  if (state === 'CR_EMAIL') {
    const email = text.trim().toLowerCase() === 'skip' ? 'Not provided' : text.trim();
    updateSession(phone, { state: 'CR_MSG', data: { email } });
    if (lang === 'hindi') return `अपना संदेश या पूछताछ विस्तार से लिखें।`;
    if (lang === 'hinglish') return `Apna message ya inquiry detail me likhein.`;
    return `Please type your detailed message or inquiry.`;
  }

  if (state === 'CR_MSG') {
    const fd = data as Record<string, string>;
    try {
      await appendContactMessage({
        name: fd['name'],
        phone: fd['phone'] || phone,
        email: fd['email'],
        subject: 'WhatsApp Inquiry',
        message: text.trim()
      });
      resetSession(phone);
      if (lang === 'hindi') return `✅ आपका संदेश प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।`;
      if (lang === 'hinglish') return `✅ Aapka message receive ho gaya hai. Hamari team jald hi aapko contact karegi.`;
      return `✅ Your inquiry has been successfully captured. Our team will get back to you shortly.`;
    } catch (e) { console.error('CR error:', e); }
    resetSession(phone);
    return `An error occurred. Please contact 0261-227-7119 directly.`;
  }

  // ── Fallback: AI general chat ──────────────────────────────
  return await aiReply(text, session);
}
