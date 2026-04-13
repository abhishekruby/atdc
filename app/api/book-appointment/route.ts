import { NextResponse } from 'next/server';
import { appendBooking } from '@/lib/sheets';
import { sendAdminNotification, sendUserAcknowledgement } from '@/lib/whatsapp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, department, doctor, date, slot, message } = body;

    // Validation
    if (!name || !phone || !department || !date || !slot) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Backend Date Validation
    const parsedDate = new Date(date);
    const now = new Date();
    parsedDate.setHours(0,0,0,0);
    const currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.floor((parsedDate.getTime() - currentStart.getTime()) / (1000 * 3600 * 24));
    const minOffset = now.getHours() >= 17 ? 1 : 0;
    
    if (diffDays < minOffset || diffDays > 7) {
      return NextResponse.json(
        { success: false, message: 'Invalid date. Appointments can only be booked up to 7 days in advance. Same-day bookings close at 5 PM.' },
        { status: 400 }
      );
    }

    // 1. Store in Google Sheets
    await appendBooking({
      name,
      phone,
      department,
      doctor: doctor || 'N/A',
      date,
      slot,
      message: message || '',
    });

    // 2. Notify Admin via WhatsApp
    // Note: We don't wait for this to succeed to return success to user,
    // but for high reliability we'll await it here.
    try {
      await sendAdminNotification({
        name,
        phone,
        department,
        doctor: doctor || 'N/A',
        date,
        slot,
        message: message || '',
      });
    } catch (wsError) {
      console.error('Failed to send admin notification:', wsError);
      // We still return success since the booking is saved in Sheets
    }

    // 3. Send Acknowledgement to User via WhatsApp
    try {
      await sendUserAcknowledgement(phone, name, date, slot, department);
    } catch (userWsError) {
      console.error('Failed to send user acknowledgement:', userWsError);
    }

    return NextResponse.json({
      success: true,
      message: 'Your request has been received. We will confirm your appointment shortly on WhatsApp.',
    });

  } catch (error: any) {
    console.error('Booking API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
