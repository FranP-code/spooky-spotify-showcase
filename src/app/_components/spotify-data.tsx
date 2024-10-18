import SpotifyWebApi from "spotify-web-api-node";
import Showcase from "./showcase";
import { getSpotifyData } from "../utils/getSpotifyData";
import { api } from "@/trpc/server";

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
  placeholderData,
  tracksLimit,
  artistsLimit,
}: {
  accessToken: string;
  refreshToken: string;
  placeholderData: boolean;
  tracksLimit?: number;
  artistsLimit?: number;
}) {
  const fetchData = async () => {
    if (placeholderData) {
      //I'm so sorry for what I did here
      return api.userData
        .get({
          spotifyUserId: process.env.SPOTIFY_OWNER_USER_ID as string,
        })
        .then((userData) => ({
          userData: {
            body: userData?.spotifyUser
              ? {
                  ...userData.spotifyUser,
                  display_name: userData.spotifyUser.displayName,
                }
              : null,
          },
          artists: userData?.artists,
          tracksByAlbum: userData?.tracksByAlbum,
          longTermArtistData: false,
          longTermTracksData: false,
          longTermTracksByAlbum: false,
        }));
    } else {
      return getSpotifyData({
        accessToken,
        tracksLimit,
        artistsLimit,
      });
    }
  };
  const {
    artists,
    tracksByAlbum,
    userData,
    longTermArtistData,
    longTermTracksData,
    longTermTracksByAlbum,
  } = await fetchData();

  if (!artists || !tracksByAlbum || !userData?.body) {
    return <div>Error fetching data</div>;
  }

  if (userData.body.id === process.env.SPOTIFY_OWNER_USER_ID) {
    await api.userData.create({
      spotifyUserId: userData.body.id,
      artists: artists.map((artist) => ({
        name: artist.name,
        images: artist.images,
      })),
      tracksByAlbum: tracksByAlbum,
      user: {
        id: userData.body.id,
        displayName: userData.body.display_name || "",
        images: userData.body.images || [],
      },
    });
  }

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

      <Showcase
        userData={userData?.body}
        tracksByAlbum={tracksByAlbum}
        artists={artists}
        longTermArtistData={longTermArtistData}
        longTermTracksData={longTermTracksData}
        longTermTracksByAlbum={longTermTracksByAlbum}
      />
    </>
  );
}
