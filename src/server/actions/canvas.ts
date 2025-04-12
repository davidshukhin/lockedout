"use server";

import { supabase } from "~/server/db";
import { auth } from "~/server/auth";

export async function saveCanvasKey(canvasKey: string) {
	const session = await auth();
	console.log(session?.user.id)
	if (!session?.user) {
		throw new Error("Not authenticated");
	}

	await supabase.from("canvas_tokens").upsert({
		user_id: session.user.id,
		access_token: canvasKey,
	  });

	  return canvasKey;

} 