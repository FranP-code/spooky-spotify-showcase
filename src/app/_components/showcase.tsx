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
  const [spookify, setSpookify] = useState(false);
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
        .map(
          (album, index) =>
            !index && <AlbumShowcase spookify={spookify} {...album} />,
        )}
      <h3>Artists images</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {[artists[0]].map((artist) => {
          return (
            <ArtistShowcase spookify={spookify} key={artist.id} {...artist} />
          );
        })}
      </div>
    </>
  );
}

export default Showcase;
