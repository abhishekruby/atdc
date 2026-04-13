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
const oldSysPromptRegex = /const SYSTEM_PROMPT = `[\s\S]*?`;/;
const newSysPrompt = `const SYSTEM_PROMPT = \`You are the AI Assistant of Acharya Tulsi Diagnostic Centre (ATDC), Surat, Gujarat.

PERSONALITY:
- Speak in a highly professional, clinical, and respectful tone.
- Do not use names like "Priya". You are "AI Assistant of ATDC".
- Maintain formal structure; avoid excessive emojis.
- Provide clear, direct, and concise operational instructions.
- If the user writes in Hindi or Gujarati, respond formally in that language.
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
  "How may I assist you today?\n\n📅 Type *book* – Schedule an appointment\n🏠 Type *home collection* – Arrange a sample pickup\n✉️ Type *contact request* – Submit an inquiry\n📍 Type *branches* – View our locations\n\nPlease state your requirement."
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
    return \`नमस्ते। मैं ATDC की AI असिस्टेंट हूं।\\n\\nकृप्या अपनी जरूरत चुनें:\\n\\n📅 अपॉइंटमेंट बुक करें – *book* टाइप करें\\n🏠 होम कलेक्शन – *home collection* टाइप करें\\n✉️ संपर्क करें – *contact request* टाइप करें\\n📍 हमारी ब्रांच – *branches* टाइप करें\`;
  if (lang === 'gujarati')
    return \`નમસ્તે. હું ATDC ની AI આસિસ્ટન્ટ છું.\\n\\nકૃપા કરીને તમારી જરૂરિયાત પસંદ કરો:\\n\\n📅 અપોઇન્ટમેન્ટ – *book* ટાઇપ કરો\\n🏠 હોમ કલેક્શન – *home collection* ટાઇપ કરો\\n✉️ સંપર્ક – *contact request* ટાઇપ કરો\\n📍 અમારી શાખાઓ – *branches* ટાઇપ કરો\`;
  if (lang === 'hinglish')
    return \`Namaste. Main ATDC ki AI Assistant hoon.\\n\\nKripya apni zaroorat chunen:\\n\\n📅 Appointment – *book* likhein\\n🏠 Home collection – *home collection* likhein\\n✉️ Contact Request – *contact request* likhein\\n📍 Branches – *branches* likhein\`;
  return \`Hello. I am the AI Assistant for ATDC.\\n\\nHow may I assist you today?\\n\\n📅 *Book appointment* – type "book"\\n🏠 *Home collection* – type "home collection"\\n✉️ *Contact Request* – type "contact request"\\n📍 *Find a branch* – type "branches"\`;
}`;
content = content.replace(/function welcomeMsg[\s\S]*?}\n/, newWelcome + '\n');


fs.writeFileSync('lib/chatbot.ts', content);
console.log('Chatbot.ts Phase 1 Replaced successfully');
