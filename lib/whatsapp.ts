const WHATSAPP_API_VERSION = 'v22.0';
const WHATSAPP_URL = `https://graph.facebook.com/${WHATSAPP_API_VERSION}`;

export async function sendWhatsAppMessage(to: string, data: any) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    throw new Error('WhatsApp Meta API credentials not found in environment variables');
  }

  const response = await fetch(`${WHATSAPP_URL}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      ...data,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    console.error('WhatsApp API error:', result);
    throw new Error(result.error?.message || 'Failed to send WhatsApp message');
  }

  return result;
}

export async function sendAdminNotification(booking: {
  name: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  slot: string;
  message: string;
}) {
  const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;
  if (!adminNumber) return;

  const useFreeText = process.env.WHATSAPP_USE_FREE_TEXT === 'true';

  if (useFreeText) {
    // Free-form text — only works if admin messaged the test number within the last 24 hrs
    const text =
      `🚨 *New Appointment Booking* 🚨\n\n` +
      `*Patient:* ${booking.name}\n` +
      `*Phone:* ${booking.phone}\n` +
      `*Dept:* ${booking.department}\n` +
      `*Doctor:* ${booking.doctor}\n` +
      `*Date:* ${booking.date}\n` +
      `*Slot:* ${booking.slot}\n` +
      `*Message:* ${booking.message || 'N/A'}\n\n` +
      `Check the Google Sheet and update status to Confirmed/Rejected when ready.`;

    await sendWhatsAppMessage(adminNumber, {
      type: 'text',
      text: { body: text },
    });
  } else {
    // Template message — works anytime without 24-hr window
    // hello_world is pre-approved on all Meta sandbox/test accounts
    await sendWhatsAppMessage(adminNumber, {
      type: 'template',
      template: {
        name: 'hello_world',
        language: { code: 'en_US' },
      },
    });
  }
}

export async function sendConfirmation(phone: string, booking: {
  name: string;
  date: string;
  slot: string;
  dept: string;
}) {
  const templateName = process.env.WHATSAPP_TEMPLATE_CONFIRMED || 'appointment_confirmed';
  const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en';

  await sendWhatsAppMessage(phone, {
    type: 'template',
    template: {
      name: templateName,
      language: { code: language },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: booking.name },
            { type: 'text', text: booking.date },
            { type: 'text', text: booking.slot },
            { type: 'text', text: booking.dept },
          ],
        },
      ],
    },
  });
}

export async function sendRejection(phone: string, name: string) {
  const templateName = process.env.WHATSAPP_TEMPLATE_REJECTED || 'appointment_rejected';
  const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en';

  await sendWhatsAppMessage(phone, {
    type: 'template',
    template: {
      name: templateName,
      language: { code: language },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: name },
          ],
        },
      ],
    },
  });
}

export async function sendTextMessage(to: string, text: string) {
  await sendWhatsAppMessage(to, {
    type: 'text',
    text: { body: text },
  });
}

export async function sendUserAcknowledgement(phone: string, name: string, date: string, slot: string, dept: string) {
  const useFreeText = process.env.WHATSAPP_USE_FREE_TEXT === 'true';

  if (useFreeText) {
    const text = `Dear ${name},\n\nThank you for choosing Acharya Tulsi Diagnostic Centre.\n\nWe have received your appointment request for *${dept}* on *${date}* at *${slot}*.\n\nOur staff will review your request and contact you shortly to confirm your booking.\n\nFor any urgent queries, please reach out to us.\n\nBest regards,\n*Acharya Tulsi Diagnostic Centre Team*`;
    await sendTextMessage(phone, text);
  } else {
    const templateName = process.env.WHATSAPP_TEMPLATE_ACKNOWLEDGEMENT || 'hello_world';
    const language = templateName === 'hello_world' ? 'en_US' : (process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en');
    
    await sendWhatsAppMessage(phone, {
      type: 'template',
      template: {
        name: templateName,
        language: { code: language },
      },
    });
  }
}

export async function sendHomeCollectionAcknowledgement(phone: string, name: string, tests: string, date: string, slot: string) {
  const useFreeText = process.env.WHATSAPP_USE_FREE_TEXT === 'true';

  if (useFreeText) {
    const defaultTests = tests && tests !== 'Not specified' ? tests : 'health checkup';
    const text = `Dear ${name},\n\nThank you for choosing Acharya Tulsi Diagnostic Centre.\n\nWe have received your home collection request for *${defaultTests}* on *${date}* at *${slot}*.\n\nOur team will review your request and contact you shortly to confirm the assigned phlebotomist and final booking details.\n\nBest regards,\n*Acharya Tulsi Diagnostic Centre Team*`;
    await sendTextMessage(phone, text);
  } else {
    const templateName = process.env.WHATSAPP_TEMPLATE_ACKNOWLEDGEMENT || 'hello_world';
    const language = templateName === 'hello_world' ? 'en_US' : (process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en');
    
    await sendWhatsAppMessage(phone, {
      type: 'template',
      template: {
        name: templateName,
        language: { code: language },
      },
    });
  }
}

export async function sendContactAcknowledgement(phone: string, name: string) {
  const useFreeText = process.env.WHATSAPP_USE_FREE_TEXT === 'true';

  if (useFreeText) {
    const text = `Dear ${name},\n\nThank you for reaching out to Acharya Tulsi Diagnostic Centre.\n\nWe have received your message and our support team will get back to you as soon as possible.\n\nFor any urgent queries, please call us directly.\n\nBest regards,\n*Acharya Tulsi Diagnostic Centre Team*`;
    await sendTextMessage(phone, text);
  } else {
    const templateName = process.env.WHATSAPP_TEMPLATE_ACKNOWLEDGEMENT || 'hello_world';
    const language = templateName === 'hello_world' ? 'en_US' : (process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en');
    
    await sendWhatsAppMessage(phone, {
      type: 'template',
      template: {
        name: templateName,
        language: { code: language },
      },
    });
  }
}
