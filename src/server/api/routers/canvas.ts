import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { saveCanvasKey } from "~/server/actions/canvas";

export const canvasRouter = createTRPCRouter({
  saveKey: protectedProcedure
    .input(z.object({ canvasKey: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const assignments = await saveCanvasKey(input.canvasKey);
      return assignments; // Must match `Assignment[]`
    }),
});
