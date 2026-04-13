import { NextResponse } from 'next/server';

export async function GET() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return NextResponse.json({ error: 'Credentials not found' }, { status: 500 });
  }

  return NextResponse.json({
    clientEmail,
    privateKeyLength: privateKey.length,
    hasRealNewlines: privateKey.includes('\n'),
    startsCorrectly: privateKey.includes('BEGIN PRIVATE KEY'),
    endsCorrectly: privateKey.includes('END PRIVATE KEY'),
    firstChars: privateKey.substring(0, 30),
    lastChars: privateKey.substring(privateKey.length - 30),
  });
}
