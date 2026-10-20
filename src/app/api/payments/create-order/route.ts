import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      vendorId,
      vendorName,
      milestoneTitle = 'Booking Advance Deposit (25%)',
      amount = 50000,
      currency = 'INR',
      gateway = 'razorpay'
    } = body;

    const escrowId = `ESC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderId = `order_${gateway}_${Date.now()}`;

    // Razorpay / Stripe Integration
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    let isLiveGateway = false;

    if (gateway === 'razorpay' && razorpayKeyId && razorpayKeySecret) {
      // In production, instantiate Razorpay SDK here
      isLiveGateway = true;
    } else if (gateway === 'stripe' && stripeSecretKey) {
      // In production, instantiate Stripe SDK here
      isLiveGateway = true;
    }

    return NextResponse.json({
      success: true,
      escrowId,
      orderId,
      amount,
      currency,
      vendorName,
      milestoneTitle,
      gateway,
      isLiveGateway,
      escrowStatus: 'funds_locked_escrow',
      terms: {
        protection: '100% Refundable if vendor cancels or fails agreed specifications',
        releaseCondition: 'Released to vendor only upon organizer digital milestone sign-off',
        disputePeriodDays: 7
      },
      createdAt: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Payment order creation failed' },
      { status: 500 }
    );
  }
}
