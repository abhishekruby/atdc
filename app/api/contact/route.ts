import { NextResponse } from 'next/server';
import { appendContactMessage } from '@/lib/sheets';

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
