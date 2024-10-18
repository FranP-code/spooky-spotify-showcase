"use client";

import React, { useState } from "react";
import Switch from "./switch";
import AlbumShowcase from "./album-showcase";
import ArtistShowcase from "./artist-showcase";
import UserShowcase from "./user-showcase";
import { TypographyH2 } from "./h2";
import { TypographyH1 } from "./h1";
import ScrollSlider from "./scroll-slider";
import Charts from "./charts";

export function Showcase({
  userData,
  tracksByAlbum,
  artists,
  longTermArtistData,
  longTermTracksData,
  longTermTracksByAlbum,
}: {
  userData: Record<string, any>;
  tracksByAlbum: Record<string, any>;
  artists: any[];
  // longTermArtistData
  // longTermTracksData
  // longTermTracksByAlbum
}) {
  const [spookify, setSpookify] = useState(true);
  const [lastSpookyImageLoaded, setLastSpookyImageLoaded] = useState(0);

  const albumsQuantity = Object.values(tracksByAlbum).length;
  return (
    <>
      <div className="flex gap-2 self-start">
        <label className="flex items-center gap-2 text-lg font-bold leading-6 text-white">
          Spookify
        </label>
        <Switch isChecked={spookify} setIsChecked={setSpookify} />
      </div>
      <UserShowcase spookify={spookify} {...userData} />
      <ScrollSlider>
        <TypographyH1 className="mb-2 mt-8 self-baseline text-3xl lg:text-4xl">
          Tracks by album
        </TypographyH1>
      </ScrollSlider>
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
      <ScrollSlider>
        <TypographyH1 className="mb-2 mt-8 self-baseline text-3xl lg:text-4xl">
          Artists
        </TypographyH1>
      </ScrollSlider>

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
      {longTermArtistData && longTermTracksData && longTermTracksByAlbum && (
        <>
          <ScrollSlider className="w-full">
            <TypographyH1 className="mb-2 mt-8 self-center text-center text-3xl lg:text-4xl">
              Charts
            </TypographyH1>
            <p className="text-center text-lg text-white text-opacity-40 backdrop-blur-lg backdrop-filter">
              Let's see what's trending in your world.
            </p>
            <Charts
              longTermArtistData={longTermArtistData}
              longTermTracksData={longTermTracksData}
              longTermTracksByAlbum={longTermTracksByAlbum}
            />
          </ScrollSlider>
        </>
      )}
    </>
  );
}

export default Showcase;
