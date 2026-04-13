import { NextResponse } from 'next/server';
import { sendTextMessage } from '@/lib/whatsapp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sheetName, patientName, phone, status, date, slot } = body;

    // Validate incoming payload
    if (!phone || !status || !sheetName) {
      return NextResponse.json({ success: false, message: 'Missing required payload parameters.' }, { status: 400 });
    }

    // Only process Confirmed or Rejected statuses
    if (status !== 'Confirmed' && status !== 'Rejected') {
      return NextResponse.json({ success: true, message: 'Status ignored. Only Confirmed/Rejected trigger notifications.' });
    }

    const securePhone = String(phone).replace(/\D/g, '');
    let notificationText = '';

    // Route logic based on sheet (Appointment vs Home Collection)
    if (sheetName === 'Appointments') {
      if (status === 'Confirmed') {
        notificationText = `✅ *Appointment Confirmed!*\n\nHello ${patientName},\nYour appointment for ${date} during ${slot} is confirmed.\n\nSee you soon at ATDC! 🏥📍`;
      } else {
        notificationText = `❌ *Appointment Update*\n\nHello ${patientName},\nUnfortunately, we had to reject your appointment request for ${date} during ${slot}.\n\nPlease call us at 0261-227-7119 to reschedule. Apologies for the inconvenience.`;
      }
    } else if (sheetName === 'Home Collection') {
      if (status === 'Confirmed') {
        notificationText = `🏠✅ *Home Collection Confirmed!*\n\nHello ${patientName},\nYour home collection for ${date} during ${slot} is confirmed. Our phlebotomist will arrive as scheduled.\n\nThank you for choosing ATDC! 💉`;
      } else {
        notificationText = `🏠❌ *Home Collection Update*\n\nHello ${patientName},\nUnfortunately, we cannot fulfill your home collection request for ${date} during ${slot}.\n\nPlease call us at 0261-227-7119 to reschedule. Apologies for the inconvenience.`;
      }
    } else {
      // Fallback for unknown sheets
      if (status === 'Confirmed') {
        notificationText = `✅ Hello ${patientName}, your request for ${date} has been Confirmed by ATDC!`;
      } else {
        notificationText = `❌ Hello ${patientName}, your request for ${date} has been Rejected by ATDC. Please call 0261-227-7119.`;
      }
    }

    // Send the dynamic text via explicit template bypass using sendTextMessage 
    // This allows flexible updates locally.
    await sendTextMessage(securePhone, notificationText);

    return NextResponse.json({ success: true, message: `Notification sent to ${securePhone}` });
  } catch (error: any) {
    console.error('Sheets Webhook Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
