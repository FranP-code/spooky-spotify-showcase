import SpotifyWebApi from "spotify-web-api-node";
import { FETCH_ARTISTS_LIMIT, FETCH_TRACKS_LIMIT } from "./contants";
import { TrackByAlbum } from "../_components/spotify-data";

export const getSpotifyData = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });
  spotifyApi.setAccessToken(accessToken);

  const [artistsData, tracksData, userData] = await Promise.all([
    spotifyApi.getMyTopArtists({
      limit: FETCH_ARTISTS_LIMIT,
      time_range: "short_term",
    }),
    spotifyApi.getMyTopTracks({
      limit: FETCH_TRACKS_LIMIT,
      time_range: "short_term",
    }),
    spotifyApi.getMe(),
  ]);

  const artists = artistsData.body.items;
  const tracks = tracksData.body.items.map((track, i) => ({
    ...track,
    position: i + 1,
  }));

  const tracksByAlbum = tracksData.body.items.reduce(
    (acc: Record<string, TrackByAlbum>, track) => {
      if (!acc[track.album.id]) {
        const tracksWithAlbum = tracks.filter(
          (t) => t.album.id === track.album.id,
        );
        acc[track.album.id] = {
          album: track.album,
          position:
            tracksWithAlbum.reduce(
              (acc, _track) => FETCH_TRACKS_LIMIT / _track.position + acc,
              0,
            ) / tracksWithAlbum.length,
          tracks: [],
        };
      }
      (acc[track.album.id] || ({ tracks: [] } as any)).tracks.push(track);
      return acc;
    },
    {},
  );

  return {
    userData,
    tracksByAlbum,
    artists,
  };
};
