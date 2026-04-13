const fs = require('fs');

let content = fs.readFileSync('lib/chatbot.ts', 'utf8');

// 1. Imports
content = content.replace(
  "import { appendBooking, appendHomeCollection } from './sheets';",
  "import { appendBooking, appendHomeCollection, appendContactMessage } from './sheets';"
);

// 2. ChatState
content = content.replace(
  "| 'HC_NAME' | 'HC_PHONE' | 'HC_ADDRESS' | 'HC_TESTS' | 'HC_DATE' | 'HC_TIME';",
  "| 'HC_NAME' | 'HC_PHONE' | 'HC_ADDRESS' | 'HC_TESTS' | 'HC_DATE' | 'HC_TIME'\n  | 'CR_NAME' | 'CR_PHONE' | 'CR_EMAIL' | 'CR_MSG';"
);

// 3. System Prompt
const newSysPrompt = `const SYSTEM_PROMPT = \`You are the AI Assistant of Acharya Tulsi Diagnostic Centre (ATDC), Surat, Gujarat.

PERSONALITY:
- Speak in a highly professional, clinical, and respectful tone.
- Do not use names like "Priya". You are "AI Assistant of ATDC".
- Maintain formal structure; avoid emojis.
- Provide clear, direct, and concise operational instructions.
- If the user writes in Hindi or Gujarati, respond formally in that language without informal slang.
- Keep responses concise but complete (under 150 words).

ATDC FACTS:
- 5 branches in Surat: Udhna (HQ, 24/7), Pandesara (8AM-9PM), Bhestan, Sachin, Godadara.
- Services: Pathology, Radiology, Cardiology, General checkup.
- Phone: 0261-227-7119 | Email: udhnatyp@gmail.com
- To book an appointment, the user should type "book".
- To schedule a home collection, type "home collection".
- To submit a contact request, type "contact request".

IMPORTANT: Do NOT provide medical advice or test prices. Direct them to the website /test-prices or phone number.\`;`;
content = content.replace(/const SYSTEM_PROMPT = `[\s\S]*?`;/, newSysPrompt);

// 4. Fallback strings
content = content.replace(
  /We're open \*Mon–Sun, 7 AM – 9 PM\* across all branches. Our \*Udhna\* branch runs \*24\/7\*! 🕐/g,
  "ATDC operating hours: Mon-Sun, 7 AM - 9 PM across all branches. The Udhna branch operates 24/7."
);
content = content.replace(
  /We offer \*24\/7 home sample collection\* across Surat! 🏠\\nJust type \*home collection\* and I'll schedule a visit for you./g,
  "ATDC offers 24/7 home sample collection across Surat. Please type *home collection* to initiate a booking."
);
content = content.replace(
  /For test prices, visit our website at \*\/test-prices\* or call \*0261-227-7119\*. 💰/g,
  "For test pricing, please visit our website at /test-prices or contact our support team at 0261-227-7119."
);
content = content.replace(
  /Reports are usually ready within \*24 hours\*. 📋 Bring your receipt to collect, or call \*0261-227-7119\*./g,
  "Reports are typically generated within 24 hours. Please retain your receipt for collection or call 0261-227-7119."
);
content = content.replace(
  /We have specialist doctors in \*Pathology, Radiology,\* and \*Cardiology\*. Type \*book\* to schedule with one! 👨‍⚕️/g,
  "ATDC employs specialists in Pathology, Radiology, and Cardiology. Type *book* to schedule an appointment."
);
content = content.replace(
  /You can email us at \*udhnatyp@gmail.com\* — we respond within 1 business day. 📧/g,
  "You may reach us via email at udhnatyp@gmail.com. We intend to respond within 1 business day."
);
content = content.replace(
  /📞 \*0261-227-7119\*\\n📧 \*udhnatyp@gmail.com\*\\n\\nOr pop into any of our 5 branches in Surat. We're always happy to help! 😊/g,
  "📞 0261-227-7119\n📧 udhnatyp@gmail.com\n\nYou may also visit any of our 5 branches in Surat. We are here to assist you."
);
content = content.replace(
  /Happy to help! You can:\\n\\n📅 Type \*book\* – schedule an appointment\\n🏠 Type \*home collection\* – arrange a sample pickup\\n📍 Type \*branches\* – find us\\n\\nOr just ask me anything! 😊/g,
  "How may I assist you today?\n\nType *book* – Schedule an appointment\nType *home collection* – Arrange a sample pickup\nType *contact request* – Submit an inquiry\nType *branches* – View our locations\n\nPlease state your requirement."
);

// 5. Branch List
content = content.replace(
  /Here are our 5 branches in Surat:\\n\\n/g,
  "ATDC operates 5 branches across Surat:\n\n"
);
content = content.replace(
  /\\n\\nCall any branch: \*0261-227-7119\*/g,
  "\n\nCentral Helpline: 0261-227-7119"
);

// 6. Welcome Message
const newWelcome = `function welcomeMsg(lang: Language): string {
  if (lang === 'hindi')
    return \`नमस्ते। मैं ATDC की AI असिस्टेंट हूं।\\n\\nकृप्या अपनी जरूरत चुनें:\\n\\nअपॉइंटमेंट बुक करें – *book* टाइप करें\\nहोम कलेक्शन – *home collection* टाइप करें\\nसंपर्क करें – *contact request* टाइप करें\\nहमारी ब्रांच – *branches* टाइप करें\`;
  if (lang === 'gujarati')
    return \`નમસ્તે. હું ATDC ની AI આસિસ્ટન્ટ છું.\\n\\nકૃપા કરીને તમારી જરૂરિયાત પસંદ કરો:\\n\\nઅપોઇન્ટમેન્ટ – *book* ટાઇપ કરો\\nહોમ કલેક્શન – *home collection* ટાઇપ કરો\\nસંપર્ક – *contact request* ટાઇપ કરો\\nઅમારી શાખાઓ – *branches* ટાઇપ કરો\`;
  if (lang === 'hinglish')
    return \`Namaste. Main ATDC ki AI Assistant hoon.\\n\\nKripya apni zaroorat chunen:\\n\\nAppointment – *book* likhein\\nHome collection – *home collection* likhein\\nContact Request – *contact request* likhein\\nBranches – *branches* likhein\`;
  return \`Hello. I am the AI Assistant for ATDC.\\n\\nHow may I assist you today?\\n\\n*Book appointment* – type "book"\\n*Home collection* – type "home collection"\\n*Contact Request* – type "contact request"\\n*Find a branch* – type "branches"\\n\\nPlease state your requirement.\`;
}`;
content = content.replace(/function welcomeMsg[\s\S]*?}\n/, newWelcome + '\n');


// 7. Extract the date helpers
const dateHelperTemplate = `// ── Date parsing & validation ────────────────────────────────
function parseInputDate(input: string, maxAdvanceDays: number): string | null {
  const mLocal = input.toLowerCase().trim();
  const now = new Date();
  
  const cutOffHour = 17; // 5:00 PM cutoff for same-day
  let minOffset = 0;
  if (now.getHours() >= cutOffHour) {
    minOffset = 1;
  }

  if (/today|aaj/i.test(mLocal)) {
    if (minOffset > 0) return null; // Reject today if cut-off passed
    // Formatter handles setting today safely
    const d = new Date();
    return d.toISOString().split('T')[0];
  }
  if (/tomorrow|kal/i.test(mLocal)) {
    const tmrw = new Date(now);
    tmrw.setDate(now.getDate() + 1);
    return tmrw.toISOString().split('T')[0];
  }

  const m = mLocal.match(/^(\\d{1,2})[\\/\\-](\\d{1,2})[\\/\\-](\\d{4})$/);
  const m2 = mLocal.match(/^(\\d{4})[\\/\\-](\\d{1,2})[\\/\\-](\\d{1,2})$/);
  
  let d: Date;
  if (m) d = new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1]));
  else if (m2) d = new Date(parseInt(m2[1]), parseInt(m2[2]) - 1, parseInt(m2[3]));
  else return null;

  const currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((d.getTime() - currentStart.getTime()) / (1000 * 3600 * 24));

  if (diffDays < minOffset || diffDays > maxAdvanceDays) return null;
  
  return \`\${d.getFullYear()}-\${(d.getMonth() + 1).toString().padStart(2, '0')}-\${d.getDate().toString().padStart(2, '0')}\`;
}

`;
content = content.replace("// ── Flexible matchers ─────────────────────────────────────────", dateHelperTemplate + "// ── Flexible matchers ─────────────────────────────────────────");

// 8. Replace Contact Request flow logic parsing additions

// First add handle fallback into Global shortcuts
const globalShortcutsAddition = `
  if ((session.state === 'IDLE') && /\\bcontact\\b|inquiry|request/i.test(msgLower) && !/book|home/i.test(msgLower)) {
    updateSession(phone, { state: 'CR_NAME', data: {} });
    if (lang === 'hindi') return \`आपका संपर्क अनुरोध शुरू कर रहे हैं।\\n\\nकृपया अपना पूरा नाम बताएं?\`;
    if (lang === 'hinglish') return \`Aapka contact request start kar rahe hain.\\n\\nKripya apna poora naam batayein?\`;
    return \`Initiating your contact request.\\n\\nPlease specify your full name.\`;
  }
`;
content = content.replace("  // ── Trigger: appointment booking ───────────────────────────", globalShortcutsAddition + "  // ── Trigger: appointment booking ───────────────────────────");

// 9. Add Contact Request states to the state machine
const crStateLogic = `
  // ── CONTACT REQUEST FLOW ───────────────────────────────────
  if (state === 'CR_NAME') {
    if (text.trim().length < 2) return 'Please provide a valid full name.';
    updateSession(phone, { state: 'CR_PHONE', data: { name: text.trim() } });
    if (lang === 'hindi') return \`धन्यवाद। कृपया अपना फोन नंबर प्रदान करें।\`;
    if (lang === 'hinglish') return \`Dhanyavaad. Kripya apna phone number dijiye.\`;
    return \`Thank you. Please provide your contact number.\`;
  }

  if (state === 'CR_PHONE') {
    const digits = text.replace(/\\D/g, '');
    if (digits.length < 10) return 'Please provide a valid 10-digit phone number.';
    updateSession(phone, { state: 'CR_EMAIL', data: { phone: digits } });
    if (lang === 'hindi') return \`नोट किया गया। कृपया अपना ईमेल एड्रेस बताएं। (या 'skip' लिखें)\`;
    if (lang === 'hinglish') return \`Noted. Kripya apna email address batayein. (Ya 'skip' likhein)\`;
    return \`Noted. Please provide your email address. (Or type 'skip')\`;
  }

  if (state === 'CR_EMAIL') {
    const email = text.trim().toLowerCase() === 'skip' ? 'Not provided' : text.trim();
    updateSession(phone, { state: 'CR_MSG', data: { email } });
    if (lang === 'hindi') return \`अपना संदेश या पूछताछ विस्तार से लिखें।\`;
    if (lang === 'hinglish') return \`Apna message ya inquiry detail me likhein.\`;
    return \`Please type your detailed message or inquiry.\`;
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
      if (lang === 'hindi') return \`✅ आपका संदेश प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।\\nधन्यवाद।\`;
      if (lang === 'hinglish') return \`✅ Aapka message receive ho gaya hai. Hamari team jald hi aapko contact karegi.\\nDhanyavaad.\`;
      return \`✅ Your inquiry has been successfully captured. Our team will get back to you shortly.\\nThank you.\`;
    } catch (e) { console.error('CR error:', e); }
    resetSession(phone);
    return \`An error occurred. Please contact 0261-227-7119 directly.\`;
  }

`;
content = content.replace("  // ── Fallback: AI general chat ──────────────────────────────", crStateLogic + "  // ── Fallback: AI general chat ──────────────────────────────");

// 10. Fix Bot tone in other hardcoded places
content = content.replace(/No problem! Feel free to start over anytime. 😊\\nType \*hi\* to see the menu./g, "Session reset successfully. Type *hi* to view the main menu.");
content = content.replace(/Of course! Let's get you scheduled at ATDC. 📅\\n\\nFirst, may I have your \*full name\* please\?/g, "Initiating appointment booking.\\n\\nPlease provide your *full name*.");
content = content.replace(/Perfect! Chaliye aapka appointment book karte hain. 📅\\n\\nPehle, aapka \*poora naam\* batayein\?/g, "Appointment booking chalu kar rahe hain.\\n\\nKripya apna poora naam batayein?");
content = content.replace(/बढ़िया! 😊 आपका अपॉइंटमेंट बुक करते हैं।\\n\\nपहले, आपका \*पूरा नाम\* बताएं\?/g, "अपॉइंटमेंट बुकिंग शुरू कर रहे हैं।\\n\\nकृपया अपना पूरा नाम बताएं?");
content = content.replace(/Absolutely! Our team will come to your doorstep. 🏠\\n\\nCould I start with your \*full name\*, please\?/g, "Initiating home collection request.\\n\\nPlease provide your *full name*.");
content = content.replace(/Bilkul! Hum aapke ghar aake sample lenge. 🏠\\n\\nPehle aapka \*poora naam\* bataein\?/g, "Home collection request chalu kar rahe hain.\\n\\nKripya apna poora naam batayein?");
content = content.replace(/बिल्कुल! हम आपके घर आकर सैंपल लेंगे। 🏠\\n\\nपहले आपका \*पूरा नाम\* बताएं\?/g, "होम कलेक्शन अनुरोध शुरू कर रहे हैं।\\n\\nकृपया अपना पूरा नाम बताएं?");

// Replace greetings inside state machine
content = content.replace(/const greet = \['Great!', 'Perfect!', 'Lovely!', 'Wonderful!'\]\[Math.floor\(Math.random\(\) \* 4\)\];/g, "const greet = 'Acknowledged.';");
content = content.replace(/`\$\{greet\} \$\{name\} 😊 What's the best \*phone number\* to reach you on\?`/g, "`Acknowledged. What is the *phone number* to reach you on, ${name}?`");
content = content.replace(/`\$\{greet\} \$\{name\}! Aapka \*phone number\* kya hai\?`/g, "`Samajh gaye. Aapka phone number kya hai, ${name}?`");
content = content.replace(/`\$\{greet\} \$\{name\} जी, आपका \*फोन नंबर\* क्या है\?`/g, "`नोट किया। आपका फोन नंबर क्या है, ${name}?`");

// 11. Add date validation usage to the flows
// Instead of custom regex validation down inside APPT_DATE and HC_DATE, replace it with parseInputDate
content = content.replace(
  `    const m = text.trim().match(/^(\\d{1,2})[\\/\\-](\\d{1,2})[\\/\\-](\\d{4})$/);
    const m2 = text.trim().match(/^(\\d{4})[\\/\\-](\\d{1,2})[\\/\\-](\\d{1,2})$/);
    if (!m && !m2) {
      return lang === 'hindi' ? 'कृपया तारीख DD/MM/YYYY में लिखें। जैसे: 20/04/2026'
        : 'Please send the date in *DD/MM/YYYY* format. E.g. 20/04/2026';
    }
    let formattedDate: string;
    if (m) formattedDate = \`\${m[3]}-\${m[2].padStart(2,'0')}-\${m[1].padStart(2,'0')}\`;
    else formattedDate = text.trim();`,
  `    const formattedDate = parseInputDate(text, 7);
    if (!formattedDate) {
      return lang === 'hindi' ? 'कृपया एक वैध तारीख दर्ज करें (आज से 7 दिन के भीतर)। उदाहरण: 20/04/2026'
        : 'Please provide a valid date format (within the next 7 days). E.g. 20/04/2026';
    }`
);

content = content.replace(
  `    const m = text.trim().match(/^(\\d{1,2})[\\/\\-](\\d{1,2})[\\/\\-](\\d{4})$/);
    if (!m) return 'Please use DD/MM/YYYY format. E.g. 20/04/2026';
    const formattedDate = \`\${m[3]}-\${m[2].padStart(2,'0')}-\${m[1].padStart(2,'0')}\`;`,
  `    const formattedDate = parseInputDate(text, 2);
    if (!formattedDate) {
      return lang === 'hindi' ? 'कृपया एक वैध तारीख दर्ज करें (केवल आगामी 2 दिन मान्य हैं)। उदाहरण: 20/04/2026'
        : 'Please provide a valid date format (only Today and Tomorrow are accepted). E.g. 20/04/2026';
    }`
);


// Replace further professional strings
content = content.replace(/✅ Got it! \\n\\nWhich \*department\* do you need\?\\n\\n1️⃣ Pathology \(blood tests\)\\n2️⃣ Radiology \(X-Ray, MRI, Scan\)\\n3️⃣ Cardiology \(ECG, heart\)\\n4️⃣ General checkup/g, "Noted. Which *department* do you require?\\n\\n1️⃣ Pathology (blood tests)\\n2️⃣ Radiology (X-Ray, MRI, Scan)\\n3️⃣ Cardiology (ECG, heart)\\n4️⃣ General checkup");
content = content.replace(/✅ \*.*\p{L}*\* — great choice!\\n\\nWhat \*date\* works best for you\?\\n_\(Please use DD\/MM\/YYYY — e.g. 20\/04\/2026\)_/gu, "Department selected. What *date* would you like to request?\\n_(Format: DD/MM/YYYY)_");
content = content.replace(/✅ \*\$\{dept\}\* — great choice!\\n\\nWhat \*date\* works best for you\?\\n_\(Please use DD\/MM\/YYYY — e.g. 20\/04\/2026\)_/g, "Department selected: *${dept}*. What *date* would you like to request?\\n_(Format: DD/MM/YYYY)_");
content = content.replace(/📅 \$\{text\.trim\(\)\} — noted!\\n\\nAlmost done! Which \*time slot\* works for you\?\\n\\n1️⃣ Morning \(9 AM – 12 PM\)\\n2️⃣ Afternoon \(1 PM – 4 PM\)\\n3️⃣ Evening \(5 PM – 8 PM\)/g, "Date recorded: ${formattedDate}. Which *time slot* do you prefer?\\n\\n1️⃣ Morning (9 AM – 12 PM)\\n2️⃣ Afternoon (1 PM – 4 PM)\\n3️⃣ Evening (5 PM – 8 PM)");
content = content.replace(/Thanks, \$\{text\.trim\(\)\}! 😊 What's your \*contact number\*\?/g, "Acknowledged. Please provide your *contact number*.");
content = content.replace(/✅ Perfect!\\n\\nNow, what's your \*complete address\* for the collection\? \(include area & landmark\)/g, "Noted. Please provide your *complete address* for the collection, including area and landmark.");
content = content.replace(/📍 Got your address!\\n\\nWhich \*tests\* are required\? \(e.g. CBC, Blood Sugar, Lipid Profile, Thyroid\)\\nIf unsure, just say "not sure" and our phlebotomist will guide you./g, "Address logged. Which *tests* are required? (e.g., CBC, Blood Sugar).\\nIf unsure, please state 'not sure'.");
content = content.replace(/✅ Noted the tests!\\n\\nWhat \*date\* works for your home collection\? _\(DD\/MM\/YYYY\)_/g, "Tests recorded. Please provide the *preferred date* for your home collection. _(Format: DD/MM/YYYY)_");
content = content.replace(/📅 \$\{text\.trim\(\)\} — perfect!\\n\\nWhat \*time\* should our team arrive\?\\n\\n1️⃣ Morning \(8 AM – 11 AM\)\\n2️⃣ Mid-day \(11 AM – 2 PM\)\\n3️⃣ Afternoon \(2 PM – 5 PM\)/g, "Date recorded: ${formattedDate}. Which *time slot* do you prefer?\\n\\n1️⃣ Morning (8 AM – 11 AM)\\n2️⃣ Mid-day (11 AM – 2 PM)\\n3️⃣ Afternoon (2 PM – 5 PM)");


fs.writeFileSync('lib/chatbot.ts', content);
console.log('Successfully completed full replace for chatbot.ts');
