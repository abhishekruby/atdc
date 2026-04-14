# 🏥 Acharya Tulsi Diagnostic Centre (ATDC)

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](#)

Welcome to the digital gateway of **Acharya Tulsi Diagnostic Centre (ATDC)**. This platform bridges the gap between premium diagnostic services and patient convenience through a modern web interface and an intelligent **AI Receptionist** powered by WhatsApp.

---

## 🌟 Core Features

### 🤖 AI Receptionist (WhatsApp)
- **Positioned as**: *AI Receptionist for Acharya Tulsi Diagnostic Centre* — professional, clinical, and branded.
- **Multi-lingual**: Powered by **Google Gemini**, understands and responds in English, Hindi, Gujarati, and Hinglish.
- **Smart Conversation Engine**:
  - Mid-flow intent switching — user can say "home collection" mid-appointment booking and the bot gracefully switches flows
  - Phone number correction handling — understands "sorry my number is 9XXXXXXXXX" in natural language
  - Name validation — rejects keywords (e.g. "home collection", "book") from being captured as patient names
  - General question answering during active flows — answers questions about reports, pricing, or timings without breaking the booking step
  - Expanded home collection triggers — e.g. "I can't come", "no transport", "nahi aa sakta", "ghar pe"
  - Re-prompts clearly after any invalid input in the correct language
- **Automated Bookings**: End-to-end appointment scheduling, home collections, and contact requests via chat.
- **Real-time Integration**: Connected to **Meta WhatsApp Cloud API** for instant delivery and confirmations.

### 🖥️ Floating AI Receptionist Button
- WhatsApp floating button displays the label **"AI Receptionist for Acharya Tulsi Diagnostic Centre"** on hover.
- Uses the official WhatsApp logo (replaces previous generic chat icon).
- Smooth slide-in tooltip animation, non-intrusive when idle.

### 📅 Seamless Patient Services
- **Digital Appointments**: Optimized forms for laboratory visits and home sample collections.
- **Instant Price Catalog**: Browse up-to-date diagnostic test prices directly on the web.
- **Dynamic Content**: Feature-rich sections for Doctors, Services, and Pathology packages.

### 📊 Backend Automation
- **Google Sheets Integration**: All patient requests are automatically synchronized with dedicated sheets:
  - `Appointments`
  - `Home Collection`
  - `Contact Request`
- **Instant Notifications**: Automated WhatsApp messages sent to both the patient and the administrator upon every submission.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | [Next.js 15+](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), [Material Symbols](https://fonts.google.com/icons) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **AI Engine** | [Google Gemini 1.5 Flash](https://aistudio.google.com/) |
| **Messaging** | [Meta WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api) |
| **Database** | [Google Sheets API v4](https://developers.google.com/sheets/api) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or later
- A Meta Developer App with WhatsApp Cloud API enabled
- A Google Cloud Service Account with Google Sheets API access
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation & Setup

1. **Clone & Install**:
   ```bash
   git clone https://github.com/abhishekruby/atdc.git
   cd atdc/frontend
   npm install
   ```

2. **Configuration**:
   Copy `.env.example` to `.env.local` and fill in your credentials.
   ```bash
   cp .env.example .env.local
   ```

3. **Required Environment Variables**:

   | Variable | Description |
   | :--- | :--- |
   | `GOOGLE_SHEETS_PRIVATE_KEY` | Your Service Account private key |
   | `GOOGLE_SHEETS_CLIENT_EMAIL` | Service Account email |
   | `GOOGLE_SHEET_ID` | Primary tracking spreadsheet ID |
   | `WHATSAPP_ACCESS_TOKEN` | Permanent Meta Access Token |
   | `WHATSAPP_PHONE_NUMBER_ID` | Phone Number ID from Meta dashboard |
   | `VERIFY_TOKEN` | Webhook verification token (set in Meta) |
   | `GEMINI_API_KEY` | Key for AI natural language processing |
   | `ADMIN_WHATSAPP_NUMBER` | Admin number to receive new booking alerts |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public-facing WhatsApp number (for CTA links) |
   | `CRON_SECRET` | Security key for the sheets-poller endpoint |

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```

---

## 📡 API Documentation

### Patient-Facing Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/book-appointment` | Submits new lab booking requests |
| `POST` | `/api/home-collection` | Handles home sample collection forms |
| `POST` | `/api/contact` | Direct inquiry submissions |

### WhatsApp Integration Hooks
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/whatsapp-webhook` | Verification endpoint for Meta Webhooks |
| `POST` | `/api/whatsapp-webhook` | Processes incoming WhatsApp messages via AI Receptionist |
| `POST` | `/api/sheets-poller` | Syncs status changes from Sheets → WhatsApp *(secured via `CRON_SECRET`)* |

---

## 🤖 AI Receptionist — Conversation States

The chatbot uses a stateful, multi-language conversation engine:

```
IDLE → greeting / general questions / intent detection
  ├── APPT_NAME → APPT_PHONE → APPT_DEPT → APPT_DATE → APPT_SLOT → ✅ Booked
  ├── HC_NAME → HC_PHONE → HC_ADDRESS → HC_TESTS → HC_DATE → HC_TIME → ✅ Booked
  └── CR_NAME → CR_PHONE → CR_EMAIL → CR_MSG → ✅ Submitted
```

**Mid-flow intelligence** — At every step the bot can:
- Switch the user to a different flow (e.g. appointment → home collection)
- Accept natural phone corrections ("sorry my number is...")
- Answer general questions (reports, pricing, timings) and re-prompt the current step
- Detect and reject non-name inputs from name fields

---

## 📂 Project Structure

```text
frontend/
├── app/
│   ├── api/
│   │   ├── book-appointment/    # Lab booking handler
│   │   ├── home-collection/     # Home sample collection handler
│   │   ├── contact/             # Contact inquiry handler
│   │   ├── whatsapp-webhook/    # AI Receptionist entry point
│   │   └── sheets-poller/       # Sheets ↔ WhatsApp sync
│   ├── book/                    # Appointment booking page
│   ├── home-collection/         # Home collection service page
│   ├── services/                # Diagnostic services overview
│   ├── doctors/                 # Doctor profiles
│   ├── test-prices/             # Live test price catalog
│   └── contact/                 # Contact & inquiry page
├── components/
│   ├── FloatingWhatsApp.tsx     # Floating AI Receptionist button (hover label)
│   ├── Navbar.tsx               # Branded navigation
│   ├── Footer.tsx               # Footer with links & info
│   ├── AnimatedReveal.tsx       # Scroll-reveal animation wrapper
│   └── Preloader.tsx            # Page load animation
├── lib/
│   ├── chatbot.ts               # AI Receptionist state machine & Gemini integration
│   ├── whatsapp.ts              # WhatsApp Cloud API helpers
│   └── sheets.ts                # Google Sheets append helpers
└── public/                      # Brand assets (logo, favicon, icons)
```

---

## 🔐 Security & Reliability

- **Webhook Verification**: All incoming Meta webhooks are validated against `VERIFY_TOKEN`.
- **Protected Endpoints**: Background sync tasks require Bearer auth via `CRON_SECRET`.
- **Session Management**: Chatbot sessions auto-expire after 2 hours of inactivity.
- **Input Validation**: Phone numbers, dates, and names are all validated before any sheet writes.

---

## 🏥 About ATDC

Since **1997**, **Acharya Tulsi Diagnostic Centre** has been Surat's premier destination for precision diagnostics. Serving over **7.5 Lakh+ patients** across 5 branches in Surat, ATDC remains committed to accuracy, affordability, and expert care.

**Branches**: Udhna (HQ — 24/7) · Pandesara · Bhestan · Sachin · Godadara
**Helpline**: [0261-227-7119](tel:02612277119) · **Email**: udhnatyp@gmail.com

---

Built with ❤️ by the ATDC Dev Team.
