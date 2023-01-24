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

  // get all notes
  allNotes: procedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    return await prisma.notes.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  // delete a note
  deleteNote: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { prisma } = ctx;
      try {
        return await prisma.notes.delete({
          where: {
            id,
          },
        });
      } catch (error: any) {
        console.log(`Note cannot be deleted ${error}`);
      }
    }),

  // update note
  updateNote: procedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, { message: "Must be 5 or more characters of length" })
          .max(200, {
            message: "Must not be more than 200 characters of length",
          })
          .trim(),
        description: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, description } = input;
      const { prisma } = ctx;

      try {
        return await prisma.notes.update({
          where: {
            id,
          },
          data: {
            title,
            description,
          },
        });
      } catch (error) {
        console.log(`Note cannot be updated ${error}`);
      }
    }),

  // fetch a single note
  detailNote: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const { prisma } = ctx;

      try {
        return await prisma.notes.findUnique({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(`Note detail not found ${error}`);
      }
    }),
});
