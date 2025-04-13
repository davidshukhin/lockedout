import { NextRequest, NextResponse } from 'next/server';
import { auth } from '~/server/auth'; // your existing session function

export async function GET(req: NextRequest) {
  const session = await auth();
  if (session?.user) {
    return NextResponse.json({ signedIn: true, user: session.user });
  } else {
    return NextResponse.json({ signedIn: false });
  }
}