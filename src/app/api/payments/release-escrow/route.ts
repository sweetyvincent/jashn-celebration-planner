import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { escrowId, vendorId, amount, approvedBy = 'Organizer' } = body;

    return NextResponse.json({
      success: true,
      escrowId,
      status: 'released_to_vendor',
      amount,
      payoutReference: `PAYOUT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      releasedAt: new Date().toISOString(),
      message: `Escrow funds of ₹${amount?.toLocaleString?.() || amount} have been released to the vendor following milestone verification.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
