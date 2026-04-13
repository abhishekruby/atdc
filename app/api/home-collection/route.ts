import { NextResponse } from 'next/server';
import { appendHomeCollection } from '@/lib/sheets';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, tests, date, timeSlot, source } = body;

    if (!name || !phone || !address || !date || !timeSlot) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Backend Date Validation
    const parsedDate = new Date(date);
    const now = new Date();
    parsedDate.setHours(0,0,0,0);
    const currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.floor((parsedDate.getTime() - currentStart.getTime()) / (1000 * 3600 * 24));
    const minOffset = now.getHours() >= 17 ? 1 : 0;
    
    if (diffDays < minOffset || diffDays > 2) {
      return NextResponse.json({ success: false, message: 'Invalid date. Home collection can only be booked up to 2 days in advance. Same-day bookings close at 5 PM.' }, { status: 400 });
    }

    // Save to Google Sheets
    await appendHomeCollection({ name, phone, address, tests: tests || 'Not specified', date, timeSlot, source: source || 'Website' });

    // Notify admin via WhatsApp
    const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;
    if (adminNumber) {
      const msg =
        `🏠 *New Home Collection Request*\n\n` +
        `👤 *Patient:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📍 *Address:* ${address}\n` +
        `🧪 *Tests:* ${tests || 'Not specified'}\n` +
        `📅 *Date:* ${date}\n` +
        `⏰ *Slot:* ${timeSlot}\n` +
        `📲 *Source:* ${source || 'Website'}\n\n` +
        `Please confirm and assign a phlebotomist.`;

      try {
        await sendWhatsAppMessage(adminNumber, { type: 'text', text: { body: msg } });
      } catch (e) {
        console.error('WhatsApp notify error:', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Home collection request received! Our team will confirm your slot shortly via WhatsApp.',
    });
  } catch (error: any) {
    console.error('Home Collection API Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
  }
}
