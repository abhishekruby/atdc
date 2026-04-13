import re

with open('lib/chatbot.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
content = content.replace(
    "import { appendBooking, appendHomeCollection } from './sheets';",
    "import { appendBooking, appendHomeCollection, appendContactMessage } from './sheets';"
)

# 2. ChatState
content = content.replace(
    "| 'HC_NAME' | 'HC_PHONE' | 'HC_ADDRESS' | 'HC_TESTS' | 'HC_DATE' | 'HC_TIME';",
    "| 'HC_NAME' | 'HC_PHONE' | 'HC_ADDRESS' | 'HC_TESTS' | 'HC_DATE' | 'HC_TIME'\n  | 'CR_NAME' | 'CR_PHONE' | 'CR_EMAIL' | 'CR_MSG';"
)

# 3. System Prompt
new_sys = """const SYSTEM_PROMPT = `You are the AI Assistant of Acharya Tulsi Diagnostic Centre (ATDC), Surat, Gujarat.

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

IMPORTANT: Do NOT provide medical advice or test prices. Direct them to the website /test-prices or phone number.`;"""

content = re.sub(r'const SYSTEM_PROMPT = `[\s\S]*?`;', new_sys, content)

# 4. Fallback strings
content = content.replace(
    r"We're open *Mon–Sun, 7 AM – 9 PM* across all branches. Our *Udhna* branch runs *24/7*! 🕐",
    "ATDC operating hours: Mon-Sun, 7 AM - 9 PM across all branches. The Udhna branch operates 24/7."
)
content = content.replace(
    r"We offer *24/7 home sample collection* across Surat! 🏠\nJust type *home collection* and I'll schedule a visit for you.",
    "ATDC offers 24/7 home sample collection across Surat. Please type *home collection* to initiate a booking."
)
content = content.replace(
    r"For test prices, visit our website at */test-prices* or call *0261-227-7119*. 💰",
    "For test pricing, please visit our website at /test-prices or contact our support team at 0261-227-7119."
)
content = content.replace(
    r"Reports are usually ready within *24 hours*. 📋 Bring your receipt to collect, or call *0261-227-7119*.",
    "Reports are typically generated within 24 hours. Please retain your receipt for collection or call 0261-227-7119."
)
content = content.replace(
    r"We have specialist doctors in *Pathology, Radiology,* and *Cardiology*. Type *book* to schedule with one! 👨‍⚕️",
    "ATDC employs specialists in Pathology, Radiology, and Cardiology. Type *book* to schedule an appointment."
)
content = content.replace(
    r"You can email us at *udhnatyp@gmail.com* — we respond within 1 business day. 📧",
    "You may reach us via email at udhnatyp@gmail.com. We intend to respond within 1 business day."
)
content = content.replace(
    r"📞 *0261-227-7119*\n📧 *udhnatyp@gmail.com*\n\nOr pop into any of our 5 branches in Surat. We're always happy to help! 😊",
    "📞 0261-227-7119\n📧 udhnatyp@gmail.com\n\nYou may also visit any of our 5 branches in Surat. We are here to assist you."
)
content = content.replace(
    r"Happy to help! You can:\n\n📅 Type *book* – schedule an appointment\n🏠 Type *home collection* – arrange a sample pickup\n📍 Type *branches* – find us\n\nOr just ask me anything! 😊",
    "How may I assist you today?\n\n📅 Type *book* – Schedule an appointment\n🏠 Type *home collection* – Arrange a sample pickup\n✉️ Type *contact request* – Submit an inquiry\n📍 Type *branches* – View our locations\n\nPlease state your requirement."
)

content = content.replace(
    r"Here are our 5 branches in Surat:\n\n",
    "ATDC operates 5 branches across Surat:\n\n"
)
content = content.replace(
    r"\n\nCall any branch: *0261-227-7119*",
    "\n\nCentral Helpline: 0261-227-7119"
)

newWelcome = """function welcomeMsg(lang: Language): string {
  if (lang === 'hindi')
    return `नमस्ते। मैं ATDC की AI असिस्टेंट हूं।\\n\\nकृप्या अपनी जरूरत चुनें:\\n\\n📅 अपॉइंटमेंट बुक करें – *book* टाइप करें\\n🏠 होम कलेक्शन – *home collection* टाइप करें\\n✉️ संपर्क करें – *contact request* टाइप करें\\n📍 हमारी ब्रांच – *branches* टाइप करें`;
  if (lang === 'gujarati')
    return `નમસ્તે. હું ATDC ની AI આસિસ્ટન્ટ છું.\\n\\nકૃપા કરીને તમારી જરૂરિયાત પસંદ કરો:\\n\\n📅 અપોઇન્ટમેન્ટ – *book* ટાઇપ કરો\\n🏠 હોમ કલેક્શન – *home collection* ટાઇપ કરો\\n✉️ સંપર્ક – *contact request* ટાઇપ કરો\\n📍 અમારી શાખાઓ – *branches* ટાઇપ કરો`;
  if (lang === 'hinglish')
    return `Namaste. Main ATDC ki AI Assistant hoon.\\n\\nKripya apni zaroorat chunen:\\n\\n📅 Appointment – *book* likhein\\n🏠 Home collection – *home collection* likhein\\n✉️ Contact Request – *contact request* likhein\\n📍 Branches – *branches* likhein`;
  return `Hello. I am the AI Assistant for ATDC.\\n\\nHow may I assist you today?\\n\\n📅 *Book appointment* – type "book"\\n🏠 *Home collection* – type "home collection"\\n✉️ *Contact Request* – type "contact request"\\n📍 *Find a branch* – type "branches"\\n\\nPlease state your requirement.`;
}"""
content = re.sub(r'function welcomeMsg[\s\S]*?}\n', newWelcome + '\n', content)

# 7. Add Date validation Helper at the top
date_helper = """
// ── Date parsing & validation ────────────────────────────────
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

  if (diffDays < minOffset || diffDays > maxAdvanceDays) return null;
  
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}
"""

content = re.sub(r'// ── Flexible matchers', date_helper + '\n// ── Flexible matchers', content)

with open('lib/chatbot.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Rewrite python script successful")
