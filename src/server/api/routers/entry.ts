import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  generateEntryUniqueKey,
  makeImageSpooky,
  uploadImage,
} from "@/server/utils";

export type Entry = {
  type: "artist" | "album";
  name: string;
  image: string;
};

export const entryRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        type: z.enum(["artist", "album"]),
        name: z.string().min(1),
        image: z.string().min(1),
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
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const key = generateEntryUniqueKey(input.entry);
      try {
        const uploadedImage = await uploadImage(input.entry.image);
        if (!uploadedImage || typeof uploadedImage !== "string") {
          throw new Error("Failed to upload image");
        }
        const spookyImage = makeImageSpooky(uploadedImage);
        if (!spookyImage || typeof spookyImage !== "string") {
          throw new Error("Failed to make image spooky");
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
          throw new Error("No generated image found");
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
        return error;
      }
    }),
});
