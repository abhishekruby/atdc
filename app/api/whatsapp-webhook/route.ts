import { NextResponse } from 'next/server';
import { handleUserMessage } from '@/lib/chatbot';
import { sendTextMessage } from '@/lib/whatsapp';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('✅ Webhook Verified!');
      return new Response(challenge, { status: 200 });
    } else {
      console.log('❌ Webhook verification failed. Token mismatch.');
      return new Response(null, { status: 403 });
    }
  }
  return new Response(null, { status: 400 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Full body log so we can debug what Meta is sending
    console.log('📨 Webhook POST received:', JSON.stringify(body, null, 2));

    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const change = entry?.changes?.[0];
      const value = change?.value;
      const message = value?.messages?.[0];

      console.log('📩 Message extracted:', JSON.stringify(message, null, 2));

      if (!message) {
        // Could be a status update (sent/delivered/read), not a user message
        console.log('ℹ️ No message in payload — likely a status update, ignoring.');
        return NextResponse.json({ success: true });
      }

      const phone = message.from;
      const type = message.type;

      console.log(`📱 From: ${phone}, Type: ${type}`);

      if (type === 'text') {
        const text = message.text?.body;
        console.log(`💬 Text: ${text}`);

        const replyText = await handleUserMessage(phone, text);
        console.log(`🤖 Bot reply: ${replyText}`);

        await sendTextMessage(phone, replyText);
        console.log(`✅ Reply sent to ${phone}`);

      } else if (type === 'interactive') {
        // Handle button/list replies if needed in future
        const reply = message.interactive?.button_reply?.title
          || message.interactive?.list_reply?.title
          || '';
        if (reply) {
          const replyText = await handleUserMessage(phone, reply);
          await sendTextMessage(phone, replyText);
        }
      } else {
        // Voice note, image, sticker, etc.
        await sendTextMessage(phone,
          `Hi! I received your ${type} message, but I can only handle text right now. 😊\n\nType *"hi"* to see what I can help with.`
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('❌ Webhook Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
