import SpotifyWebApi from "spotify-web-api-node";
import Showcase from "./showcase";
import { FETCH_ARTISTS_LIMIT, FETCH_TRACKS_LIMIT } from "../utils/contants";

export type TrackByAlbum = {
  album: {
    id: string;
    name: string;
    images: { url: string }[];
  };
  position: number;
  tracks: {
    id: string;
    name: string;
  }[];
};

export default async function SpotifyData({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });
  spotifyApi.setAccessToken(accessToken);

  const albumsData = await spotifyApi.getMySavedAlbums({ limit: 20 });
  const albums = albumsData.body.items;

  const artistsData = await spotifyApi.getMyTopArtists({
    limit: FETCH_ARTISTS_LIMIT,
    time_range: "short_term",
  });
  const artists = artistsData.body.items;

  const tracksData = await spotifyApi.getMyTopTracks({
    limit: FETCH_TRACKS_LIMIT,
    time_range: "short_term",
  });
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
  // type Track = {
  //   id: string;
  //   name: string;
  //   album: {
  //     id: string;
  //     name: string;
  //     images: { url: string }[];
  //   };
  //   position: number;
  // };

  // type Album = {
  //   album: {
  //     id: string;
  //     name: string;
  //     images: { url: string }[];
  //   };
  //   position: number;
  //   tracks: Track[];
  // };

  // // type Artist = {
  // //   id: string;
  // //   name: string;
  // //   images: { url: string }[];
  // // };

  // // type SpotifyDataProps = {
  // //   accessToken: string;
  // //   refreshToken: string;
  // // };

  // // type SpotifyDataResponse = {
  // //   albums: Album[];
  // //   artists: Artist[];
  // //   tracks: Track[];
  // //   tracksByAlbum: { [key: string]: Album };
  // // };

  return (
    <>
      {/* <h3>Tracks images</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {tracks.map((track) => {
          if (!track.album.images[0])
            return (
              <img
                key={track.id}
                src="https://via.placeholder.com/150"
                alt={track.name}
              />
            );
          return (
            <img
              style={{ width: "150px", height: "150px" }}
              key={track.id}
              src={track.album.images[0].url}
              alt={track.name}
            />
          );
        })}
      </div> */}

      {/* TODO CHECK IF NEEDED */}
      {/* <TRPCReactProvider>
        <h3>Tracks by album</h3>
        {Object.values(tracksByAlbum)
          .sort((a, b) => b.position - a.position)
          .map((album, index) => !index && <AlbumShowcase {...album} />)}
      </TRPCReactProvider> */}

      {/* <h3>Albums images</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {albums.map((album) => {
          if (!album.album.images[0])
            return (
              <img
                key={album.album.id}
                src="https://via.placeholder.com/150"
                alt={album.album.name}
              />
            );
          return (
            <img
              style={{ width: "150px", height: "150px" }}
              key={album.album.id}
              src={album.album.images[0].url}
              alt={album.album.name}
            />
          );
        })}
      </div> */}

      {/* <h3>Artists images</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {[artists[0]].map((artist) => {
          return <ArtistShowcase key={artist.id} {...artist} />;
        })}
      </div> */}

      <Showcase tracksByAlbum={tracksByAlbum} artists={artists} />
    </>
  );
}
