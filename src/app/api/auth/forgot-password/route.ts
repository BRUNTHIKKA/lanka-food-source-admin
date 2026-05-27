import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a reset link (In a real app, you'd save a token in DB)
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/admin/reset-password?token=mockantigravitytoken123`;

    // Log the link for development (simulating sending an email)
    console.log(`[DEV] Password reset link for ${email}: ${resetLink}`);

    return NextResponse.json({ 
      success: true, 
      message: 'If an account exists with that email, a reset link has been sent.' 
    });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

