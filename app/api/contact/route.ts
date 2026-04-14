import { NextResponse } from 'next/server';
import { appendContactMessage } from '@/lib/sheets';
import { sendWhatsAppMessage, sendContactAcknowledgement } from '@/lib/whatsapp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validation
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store in Google Sheets
    await appendContactMessage({
      name,
      phone,
      email,
      subject: subject || 'General Inquiry',
      message
    });

    // Notify admin via WhatsApp
    const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;
    if (adminNumber) {
      const adminMsg = 
        `📬 *New Contact Form Submission*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `✉️ *Email:* ${email}\n` +
        `📌 *Subject:* ${subject || 'General Inquiry'}\n` +
        `💬 *Message:* ${message}\n\n` +
        `Please reach out to the user to address their inquiry.`;

      try {
        await sendWhatsAppMessage(adminNumber, { type: 'text', text: { body: adminMsg } });
      } catch (e) {
        console.error('Failed to send contact admin notification:', e);
      }
    }

    // Send Acknowledgement to User via WhatsApp
    try {
      await sendContactAcknowledgement(phone, name);
    } catch (userWsError) {
      console.error('Failed to send user acknowledgement:', userWsError);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received.',
    });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
