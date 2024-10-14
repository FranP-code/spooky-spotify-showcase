"use client";

import React, { useState } from "react";
import Switch from "./switch";
import AlbumShowcase from "./album-showcase";
import ArtistShowcase from "./artist-showcase";

export function Showcase({
  tracksByAlbum,
  artists,
}: {
  tracksByAlbum: Record<string, any>;
  artists: any[];
}) {
  const [spookify, setSpookify] = useState(true);
  const [lastSpookyImageLoaded, setLastSpookyImageLoaded] = useState(0);

  const albumsQuantity = Object.values(tracksByAlbum).length;
  return (
    <>
      <div className="flex gap-2 self-start">
        <label className="flex items-center gap-2 text-lg font-semibold leading-6 text-white">
          Spookify
        </label>
        <Switch isChecked={spookify} setIsChecked={setSpookify} />
      </div>
      <h3>Tracks by album</h3>
      {Object.values(tracksByAlbum)
        .sort((a, b) => b.position - a.position)
        .map((album, index) => {
          return (
            <AlbumShowcase
              key={album.id}
              {...album}
              places={[index, albumsQuantity + index]}
              lastSpookyImageLoaded={lastSpookyImageLoaded}
              setLastSpookyImageLoaded={setLastSpookyImageLoaded}
              spookify={spookify}
            />
          );
        })}
      <h3>Artists images</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {artists.map((artist, index) => {
          return (
            <ArtistShowcase
              place={index + albumsQuantity}
              lastSpookyImageLoaded={lastSpookyImageLoaded}
              setLastSpookyImageLoaded={setLastSpookyImageLoaded}
              spookify={spookify}
              key={artist.id}
              {...artist}
            />
          );
        })}
      </div>
    </>
  );
}

export default Showcase;
