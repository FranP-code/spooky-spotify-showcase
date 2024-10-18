import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  generateEntryUniqueKey,
  makeImageSpooky,
  uploadImage,
} from "@/server/utils";
import { TRPCError } from "@trpc/server";

export type Entry = {
  type: "artist" | "album";
  name: string;
  image: string;
  number?: number;
};

export const entryRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        type: z.enum(["artist", "album"]),
        name: z.string().min(1),
        image: z.string().min(1),
        number: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const key = generateEntryUniqueKey(input);
      const existingEntry = await ctx.db.spookyImage.findFirst({
        where: {
          key,
        },
      });
      return existingEntry;
    }),

  generate: publicProcedure
    .input(
      z.object({
        entry: z.object({
          type: z.enum(["artist", "album"]),
          name: z.string().min(1),
          image: z.string().min(1),
          number: z.number().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const key = generateEntryUniqueKey(input.entry);
      try {
        const uploadedImage = await uploadImage(input.entry.image);
        if (!uploadedImage || typeof uploadedImage !== "string") {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to upload image",
          });
        }
        const spookyImage = makeImageSpooky(uploadedImage, input.entry.number);
        if (!spookyImage || typeof spookyImage !== "string") {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to make image spooky",
          });
        }
        await ctx.db.generatedImage.upsert({
          where: {
            key,
          },
          update: {},
          create: {
            key,
            value: spookyImage,
          },
        });
        return spookyImage;
      } catch (error) {
        console.error(error);
        if (error instanceof TRPCError) {
          throw error;
        }
        return error;
      }
    }),

  save: publicProcedure
    .input(
      z.object({
        entry: z.object({
          type: z.enum(["artist", "album"]),
          name: z.string().min(1),
          image: z.string().min(1),
          number: z.number().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const key = generateEntryUniqueKey(input.entry);
      try {
        const generatedImage = await ctx.db.generatedImage.findFirst({
          where: {
            key,
          },
        });
        if (!generatedImage) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No generated image found",
          });
        }
        const entry = await ctx.db.spookyImage.create({
          data: {
            key,
            value: generatedImage.value,
          },
        });
        return entry;
      } catch (error) {
        console.error(error);
        if (error instanceof TRPCError) {
          throw error;
        }
        return error;
      }
    }),
});
