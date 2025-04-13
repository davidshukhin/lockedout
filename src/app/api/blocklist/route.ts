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

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blockList = await getUserBlockList(session.user.id);
    return NextResponse.json({ blockList });
  } catch (error) {
    console.error("Error in GET /api/blocklist:", error);
    return NextResponse.json(
      { error: "Failed to fetch block list" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, site } = await req.json();
    
    if (!site || typeof site !== "string") {
      return NextResponse.json(
        { error: "Invalid site provided" },
        { status: 400 }
      );
    }

    let blockList: string[];
    
    if (action === "add") {
      blockList = await updateUserBlockList(session.user.id, site);
    } else if (action === "remove") {
      blockList = await removeSiteFromBlockList(session.user.id, site);
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    return NextResponse.json({ blockList });
  } catch (error) {
    console.error("Error in POST /api/blocklist:", error);
    return NextResponse.json(
      { error: "Failed to update block list" },
      { status: 500 }
    );
  }
}

