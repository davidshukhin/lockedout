"use server";

import { supabase } from "~/server/db";
import { auth } from "~/server/auth";

export async function saveCanvasKey(canvasKey: string) {
	const session = await auth();
	if (!session?.user) {
		throw new Error("Not authenticated");
	}

	const { error } = await supabase
		.from("userSettings")
		.upsert({
			userId: session.user.id,
			canvasAccessKey: canvasKey,
			updatedAt: new Date().toISOString(),
		});

	if (error) {
		throw error;
	}
} 