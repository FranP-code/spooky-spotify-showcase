import SpotifyWebApi from "spotify-web-api-node";
import { FETCH_ARTISTS_LIMIT, FETCH_TRACKS_LIMIT } from "./contants";
import { TrackByAlbum } from "../_components/spotify-data";

// const getRecentlyPlayedSongs = async ({
//   spotifyApi,
//   accessToken,
// }: {
//   spotifyApi: SpotifyWebApi;
//   accessToken: string;
// }) => {
//   const now = Date.now();
//   const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

//   let allTracks: SpotifyApi.PlayHistoryObject[] = [];

//   const response = await spotifyApi.getMyRecentlyPlayedTracks({
//     after: oneMonthAgo,
//     limit: 50,
//   });
//   allTracks = response.body.items;

//   let newUrl = response.body.next;

//   try {
//     while (newUrl) {
//       const fetchResponse = await fetch(newUrl, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }).then((res) => res.json());

//       if (!fetchResponse?.data?.items) {
//         break;
//       }
//       allTracks = allTracks.concat(fetchResponse.data.items);

//       newUrl = response?.data?.next;
//     }
//   } catch (error) {}

//   return allTracks;
// };

const getRecentlyPlayedSongs = async ({
  spotifyApi,
  accessToken,
}: {
  spotifyApi: SpotifyWebApi;
  accessToken: string;
}) => {
  const now = Date.now();
  const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

  let allTracks: SpotifyApi.PlayHistoryObject[] = [];

  try {
    // Initial API request using the SDK
    const response = await spotifyApi.getMyRecentlyPlayedTracks({
      after: oneMonthAgo,
      limit: 50,
    });

    // Collect the first batch of tracks
    allTracks = response.body.items;

    // Check if there are more pages of results
    let newUrl = response.body.next;

    // Fetch additional pages of results if they exist
    while (newUrl) {
      const fetchResponse = await fetch(newUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Parse the response JSON
      const data = await fetchResponse.json();

      // If no items are returned, exit the loop
      if (!data.items) {
        break;
      }

      // Concatenate the newly fetched tracks to the list
      allTracks = allTracks.concat(data.items);

      // Update the newUrl for the next request
      newUrl = data.next;
    }
  } catch (error) {
    console.error("Error fetching recently played tracks:", error);
  }

  return allTracks;
};

export const getSpotifyData = async ({
  accessToken,
  tracksLimit,
  artistsLimit,
}: {
  accessToken: string;
  tracksLimit?: number;
  artistsLimit?: number;
}) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });
  spotifyApi.setAccessToken(accessToken);

  const [
    artistsData,
    tracksData,
    userData,
    longTermArtistData,
    longTermTracksData,
  ] = await Promise.all([
    spotifyApi.getMyTopArtists({
      limit: Math.min(
        ...[FETCH_ARTISTS_LIMIT, artistsLimit].filter(
          (v) => typeof v === "number",
        ),
      ),
      time_range: "short_term",
    }),
    spotifyApi.getMyTopTracks({
      limit: Math.min(
        ...[FETCH_TRACKS_LIMIT, tracksLimit].filter(
          (v) => typeof v === "number",
        ),
      ),
      time_range: "short_term",
    }),
    spotifyApi.getMe(),
    spotifyApi.getMyTopArtists({
      limit: 50,
      time_range: "long_term",
    }),
    spotifyApi.getMyTopTracks({
      limit: 50,
      time_range: "long_term",
    }),
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

  const longTermTracks = longTermTracksData.body.items.map((track, i) => ({
    ...track,
    position: i + 1,
  }));

  const longTermTracksByAlbum = longTermTracksData.body.items.reduce(
    (acc: Record<string, TrackByAlbum>, track) => {
      if (!acc[track.album.id]) {
        const tracksWithAlbum = longTermTracks.filter(
          (t) => t.album.id === track.album.id,
        );
        acc[track.album.id] = {
          album: track.album,
          position:
            tracksWithAlbum.reduce(
              (acc, _track) => 50 / _track.position + acc,
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
    longTermArtistData,
    longTermTracksData,
    longTermTracksByAlbum,
  };
};
