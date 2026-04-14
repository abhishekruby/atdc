# 🏥 Acharya Tulsi Diagnostic Centre (ATDC)

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](#)

Welcome to the digital gateway of **Acharya Tulsi Diagnostic Centre (ATDC)**. This platform bridges the gap between premium diagnostic services and patient convenience through a modern web interface and an intelligent AI-driven WhatsApp assistant.

---

## 🌟 Core Features

### 🤖 Intelligent WhatsApp Assistant (Priya)
- **Multi-lingual AI**: Powered by **Google Gemini**, Priya understands English, Hindi, Gujarati, and Hinglish.
- **Automated Bookings**: Handles end-to-end appointment scheduling for Lab tests and Home Collections.
- **Real-time Interaction**: Integrated with **Meta WhatsApp Cloud API** for instant confirmations and inquiry handling.

### 📅 Seamless Patient Services
- **Digital Appointments**: Optimized forms for Laboratory visits and Home sample collections.
- **Instant Price Catalog**: Browse up-to-date diagnostic test prices directly on the web.
- **Dynamic Content**: Feature-rich sections for Doctors, Services, and Pathology packages.

### 📊 Backend Automation
- **Google Sheets Integration**: All patient requests are automatically synchronized with specialized sheets:
  - `Appointments`
  - `Home Collection`
  - `Contact Request`
- **Instant Notifications**: Automated WhatsApp messages sent to both patients and administrators upon action.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Material Symbols](https://fonts.google.com/icons)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Google Gemini AI](https://aistudio.google.com/)
- **Integrations**: 
  - [Meta WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
  - [Google Sheets API v4](https://developers.google.com/sheets/api)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or later
- A Meta Developer App with WhatsApp Cloud API enabled
- A Google Cloud Service Account with Google Sheets API access
- A Gemini API Key from Google AI Studio

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
   | `GOOGLE_SHEET_ID` | The ID of the primary tracking spreadsheet |
   | `WHATSAPP_ACCESS_TOKEN` | Permanent Meta Access Token |
   | `GEMINI_API_KEY` | Key for AI Natural Language processing |
   | `CRON_SECRET` | Security key for poller endpoints |

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```

---

## 📡 API Documentation

### Public Endpoints
- `POST /api/book-appointment`: Submits new lab booking requests.
- `POST /api/home-collection`: Handles home sample collection forms.
- `POST /api/contact`: Direct inquiry submissions.

### Integration Hooks
- `GET /api/whatsapp-webhook`: Verification endpoint for Meta Webhooks.
- `POST /api/whatsapp-webhook`: Handles incoming WhatsApp messages from patients.
- `POST /api/sheets-poller`: Internal system to sync status changes from Sheets back to WhatsApp (Secured via `CRON_SECRET`).

---

## 📂 Project Structure

```text
frontend/
├── app/
│   ├── api/                # Core logic & Integrations
│   ├── book/               # Booking flow
│   ├── home-collection/    # Mobile phlebotomy service
│   ├── services/           # Diagnostic service details
│   └── whatsapp-demo/      # Chatbot showcase
├── components/             # Premium UI components (AnimatedReveal, Navbar, etc.)
├── lib/                    # Shared utilities (Google Auth, WhatsApp Helpers)
└── public/                 # Optimized brand assets (Logos, Icons)
```

## 🔐 Security & Reliability
- **Verification Tokens**: All Webhooks are secured with unique verify tokens to prevent unauthorized triggers.
- **Service Endpoints**: Background sync tasks are protected by Bearer authentication (`CRON_SECRET`).
- **NABL Standards**: UI design respects medical diagnostic standards for trust and clarity.

## 🏥 About ATDC
Since 1997, **Acharya Tulsi Diagnostic Centre** has been Surat's premier choice for precision diagnostics. Serving over 7.5 Lakh+ patients, it remains committed to accuracy and expert care.

---
Built with ❤️ by the ATDC Dev Team.


