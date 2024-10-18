import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userDataRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ spotifyUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      const spotifyUser = await ctx.db.spotifyUser.findUnique({
        where: {
          spotifyUserId: input.spotifyUserId,
        },
      });
      if (!spotifyUser) {
        return null;
      }
      const userData = await ctx.db.userData.findFirst({
        include: {
          spotifyUser: {
            select: {
              spotifyUserId: true,
              displayName: true,
              images: true,
            },
          },
          artists: {
            select: {
              name: true,
              images: true,
            },
          },
          // albums: {
          //   select: {
          //     name: true,
          //     images: true,
          //     tracks: {
          //       select: {
          //         name: true,
          //       },
          //     },
          //   },
          // },
        },
        where: {
          spotifyUser: {
            spotifyUserId: input.spotifyUserId,
          },
        },
      });

      if (!userData) {
        return null;
      }

      return {
        ...userData,
        spotifyUser: {
          ...spotifyUser,
          images: userData.spotifyUser.images,
          id: spotifyUser.spotifyUserId,
        },
        tracksByAlbum: JSON.parse(userData.tracksByAlbum),
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        spotifyUserId: z.string(),
        tracksByAlbum: z.record(
          z.object({
            album: z.object({
              id: z.string(),
              name: z.string(),
              images: z.array(
                z.object({
                  url: z.string(),
                }),
              ),
            }),
            position: z.number(),
            tracks: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
              }),
            ),
          }),
        ),
        artists: z.array(
          z.object({
            name: z.string(),
            images: z.array(
              z.object({
                url: z.string(),
              }),
            ),
          }),
        ),
        user: z.object({
          id: z.string(),
          displayName: z.string(),
          images: z.array(
            z.object({
              url: z.string(),
            }),
          ),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const spotifyUser = await ctx.db.spotifyUser.findUnique({
        where: {
          spotifyUserId: input.spotifyUserId,
        },
      });
      if (spotifyUser) {
        return null;
      }
      await ctx.db.userData.create({
        data: {
          spotifyUser: {
            create: {
              displayName: input.user.displayName,
              spotifyUserId: input.user.id,
              images: {
                create: input.user.images.map((image) => ({
                  url: image.url,
                })),
              },
            },
          },
          artists: {
            create: input.artists.map((artist) => ({
              name: artist.name,
              images: {
                create: artist.images.map((image) => ({
                  url: image.url,
                })),
              },
            })),
          },
          // albums: {
          //   create: input.albums.map((album) => ({
          //     name: album.name,
          //     images: {
          //       create: album.images.map((image) => ({
          //         url: image.url,
          //       })),
          //     },
          //     tracks: {
          //       create: album.tracks.map((track) => ({
          //         name: track.name,
          //       })),
          //     },
          //   })),
          // },
          tracksByAlbum: JSON.stringify(input.tracksByAlbum),
        },
      });
    }),
});
