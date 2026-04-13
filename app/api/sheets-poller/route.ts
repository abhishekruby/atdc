import { NextResponse } from 'next/server';
import { getPendingRows, markRowNotified } from '@/lib/sheets';
import { sendConfirmation, sendRejection } from '@/lib/whatsapp';

export async function GET(request: Request) {
  try {
    // 1. Auth check for Cron
    const authHeader = request.headers.get('Authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch rows that need notification
    const pendingActions = await getPendingRows();
    const results = [];

    for (const action of pendingActions) {
      try {
        if (action.status === 'Confirmed') {
          await sendConfirmation(action.phone, {
            name: action.name,
            date: action.date,
            slot: action.slot,
            dept: action.dept
          });
        } else if (action.status === 'Rejected') {
          await sendRejection(action.phone, action.name);
        }

        // 3. Mark as notified in Sheets
        await markRowNotified(action.rowIndex);
        results.push({ phone: action.phone, status: 'success' });

      } catch (err: any) {
        console.error(`Failed to notify ${action.phone}:`, err.message);
        results.push({ phone: action.phone, status: 'error', error: err.message });
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed: results.length,
      details: results 
    });

  } catch (error: any) {
    console.error('Poller API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
