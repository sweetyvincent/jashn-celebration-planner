import { NextResponse } from 'next/server';

// WhatsApp Business API Webhook verification & incoming status listener
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'jashn_whatsapp_verify_token_2026';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ status: 'active', service: 'Jashn WhatsApp Business Gateway' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Parse incoming vendor reply or delivery status
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (message) {
      const from = message.from; // Vendor's WhatsApp number
      const text = message.text?.body;
      console.log(`[Jashn WhatsApp] Incoming message from vendor ${from}: ${text}`);

      return NextResponse.json({
        received: true,
        vendorPhone: from,
        messageSnippet: text,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ received: true, status: 'acknowledged' });
  } catch (error) {
    return NextResponse.json({ received: false, error: 'Invalid webhook payload' }, { status: 400 });
  }
}
