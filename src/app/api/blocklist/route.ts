
// src/app/api/blocklist/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import {
  getUserBlockList,
  updateUserBlockList,
  removeSiteFromBlockList,
} from '../../../server/db/blocklist';
import { auth } from '~/server/auth';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }

  try {
    const { action, site } = await req.json();

    if (!site || typeof site !== 'string') {
      return NextResponse.json({ error: 'Invalid site value' }, { status: 400 });
    }

    let updated: string[];

    if (action === 'remove') {
      updated = await removeSiteFromBlockList(session.user.id, site);
    } else {
      updated = await updateUserBlockList(session.user.id, site);
    }

    return NextResponse.json({ blockList: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update block list' }, { status: 500 });
  }
}

