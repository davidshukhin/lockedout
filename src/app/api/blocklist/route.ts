// src/app/api/blocklist/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { getUserBlockList, updateUserBlockList } from '../../../server/db/blocklist';
import { auth } from '~/server/auth';
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }
  try {
    const blockList = await getUserBlockList((session.user as { id: string }).id);
    return NextResponse.json({ blockList });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load block list' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  const session = await auth();
  console.log("session", session?.user.id)
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { blockList } = body;
    await updateUserBlockList((session.user as { id: string }).id, blockList);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update block list' }, { status: 500 });
  }
}
