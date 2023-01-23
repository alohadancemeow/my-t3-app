import { z } from "zod";
import { router, procedure } from "../trpc";

export const notesRouter = router({
  // create new note
  newNote: procedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, "Must be 5 or more characters of length!")
          .max(200, "Must not be greater then 200 charaters")
          .trim(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      try {
        return await prisma.notes.create({
          data: {
            title: input.title,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(`Note cannot be created ${error}`);
      }
    }),
});
