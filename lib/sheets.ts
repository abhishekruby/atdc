import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials not found in environment variables');
  }

  // dotenv (used by Next.js) converts \n in double-quoted values to real newlines.
  // This replace handles the rare case where the env is injected without processing.
  privateKey = privateKey.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

// ── Appointments ───────────────────────────────────────────
// Tab name configured via GOOGLE_APPOINTMENTS_TAB (default: "Appointments")
export async function appendBooking(data: {
  name: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  slot: string;
  message: string;
}) {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_APPOINTMENTS_TAB || 'Appointments';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID not found in environment variables');
  }

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:J`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        data.name,
        data.phone,
        data.department,
        data.doctor,
        data.date,
        data.slot,
        data.message || '',
        timestamp,
        'Pending',
        '',
      ]],
    },
  });
}

// ── Home Collection ────────────────────────────────────────
// Same spreadsheet, different tab configured via GOOGLE_HOME_COLLECTION_TAB (default: "Home Collection")
export async function appendHomeCollection(data: {
  name: string;
  phone: string;
  address: string;
  tests: string;
  date: string;
  timeSlot: string;
  source: string;
}) {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_HOME_COLLECTION_TAB || 'Home Collection';

  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID not found in environment variables');

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:J`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        data.name,
        data.phone,
        data.address,
        data.tests,
        data.date,
        data.timeSlot,
        `Booked via ${data.source}`,
        timestamp,
        'Pending',
        '',
      ]],
    },
  });
}

// ── Appointment confirmation polling ───────────────────────
export async function getPendingRows() {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_APPOINTMENTS_TAB || 'Appointments';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID not found in environment variables');
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!A:J`,
  });

  const rows = response.data.values || [];
  if (rows.length <= 1) return []; // Skip header

  const pendingActions = [];

  for (let i = 1; i < rows.length; i++) {
    const [name, phone, dept, doctor, date, slot, message, timestamp, status, notified] = rows[i];

    if ((status === 'Confirmed' || status === 'Rejected') && !notified) {
      pendingActions.push({
        rowIndex: i + 1, // Sheets is 1-indexed, i=1 is row 2
        name, phone, dept, date, slot, status,
      });
    }
  }

  return pendingActions;
}

export async function markRowNotified(rowIndex: number) {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_APPOINTMENTS_TAB || 'Appointments';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID not found in environment variables');
  }

  const range = `${tab}!J${rowIndex}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [['Yes']],
    },
  });
}

// ── Contact Messages ─────────────────────────────────────────
// Same spreadsheet, different tab configured via GOOGLE_CONTACT_REQUEST (default: "Contact Request")
export async function appendContactMessage(data: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}) {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_CONTACT_REQUEST || 'Contact Request';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID not found in environment variables');
  }

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:F`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        data.name,
        data.phone,
        data.email,
        data.subject,
        data.message,
        timestamp,
      ]],
    },
  });
}
