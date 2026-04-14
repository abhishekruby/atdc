# 🏥 Acharya Tulsi Diagnostic Centre (ATDC)

Welcome to the official repository for the **Acharya Tulsi Diagnostic Centre (ATDC)** digital platform. This modern web application serves as the primary touchpoint for patients to access world-class diagnostic services in Surat, integrated with a cutting-edge WhatsApp AI Assistant.

![ATDC Banner](https://lh3.googleusercontent.com/aida-public/AB6AXuBPMCHxtR-hNWs22lICLg8gTvpkU-9UUt6JyFDf2dOJ4mkQuu6_SSJ6MK71r_uTpSv5tPVeGp1E2WrrZ-rWH67vddssEbyOlcyg2NodFmAHHKs1-kDzSzyuMYSgFoork5BfHgJVHZXPBzUpRjXhXQYxbs0HY7lAsTgnS7pcvl_l9SvcKr0O5N5chmWCUxAU44Dec0ffbVCSmCafta6xROr1W10wY-0aI36Y2RYeVlvIzElsjNUytZ97Rrf9N6kgWxK5Xc8wk-0gicUV)

## ✨ Key Features

-   **🤖 WhatsApp AI Assistant (Priya):** A sophisticated, multi-lingual AI bot that handles appointment bookings, home collections, and general queries in English, Hindi, Gujarati, and Hinglish.
-   **📅 Seamless Booking System:** Integrated forms for booking lab appointments and home sample collections with real-time feedback.
-   **💰 Live Test Prices:** A dedicated section for patients to browse and check the latest prices for various diagnostic tests.
-   **🩺 specialized Services:** Detailed information about our departments, including Pathology, Radiology, Sonography, MRI, and CT Scans.
-   **📊 Google Sheets Integration:** Automated backend that logs all bookings and inquiries directly into Google Sheets for instant staff action.
-   **✨ Premium UI/UX:** Built with a focus on accessibility and aesthetics, featuring smooth animations powered by Framer Motion.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Backend Integration:** [Google APIs](https://developers.google.com/sheets/api)
-   **Icons:** [Google Material Symbols](https://fonts.google.com/icons)

## 🚀 Getting Started

### Prerequisites

-   Node.js 20.x or later
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abhishekruby/atdc.git
    cd atdc/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the necessary credentials (refer to `.env.example` if available).
    ```env
    GOOGLE_SHEETS_ID=your_sheet_id
    GOOGLE_CLIENT_EMAIL=your_client_email
    GOOGLE_PRIVATE_KEY=your_private_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```text
frontend/
├── app/                # Next.js App Router (Pages & API)
│   ├── api/            # Backend API routes for Google Sheets
│   ├── book/           # Appointment booking page
│   ├── home-collection/# Home collection request page
│   └── ...             # Other feature pages
├── components/         # Reusable UI components
├── lib/               # Utility functions and shared logic
├── public/             # Static assets (images, logos)
└── styles/             # Global styles and Tailwind configuration
```

## 🏥 About ATDC

Acharya Tulsi Diagnostic Centre (ATDC) has been a pioneer in medical diagnostics since 1997. With over **7.5 Lakh+ patients** served and a team of **29 expert doctors**, we are dedicated to providing precise and compassionate care to the Surat community.

---

Built with ❤️ for Acharya Tulsi Diagnostic Centre.

