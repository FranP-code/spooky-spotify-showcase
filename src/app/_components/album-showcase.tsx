"use client";

import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { TrackByAlbum } from "./spotify-data";
import { api } from "@/trpc/react";
import { quantum } from "ldrs";
import { ring2 } from "ldrs";

ring2.register();
quantum.register();

export default function AlbumShowcase({
  album,
  position,
  tracks,
}: TrackByAlbum) {
  const imageSource = album.images[0]
    ? album.images[0].url
    : "https://via.placeholder.com/150";

  const [showSpookyImage, setShowSpookyImage] = useState(false);
  const [spookyImageLoaded, setSpookyImageLoaded] = useState(false);

  const entry = api.entry.get.useQuery({
    type: "album",
    name: album.name,
    image: imageSource,
  });

  const generateSpookyImage = api.entry.generate.useMutation();
  const saveImage = api.entry.save.useMutation();

  const handleGenerateSpookyImage = async () => {
    if (!entry.data && !entry.isLoading) {
      generateSpookyImage.mutate({
        entry: {
          type: "album",
          name: album.name,
          image: imageSource,
        },
      });
    }
  };

  const handleSaveImage = async () => {
    if (!entry.data && !entry.isLoading) {
      saveImage.mutate({
        entry: {
          type: "album",
          image: imageSource,
          name: album.name,
        },
      });
    }
  };

  useEffect(() => {
    handleGenerateSpookyImage();
  }, [entry.data]);

  useEffect(() => {
    if (spookyImageLoaded) {
      handleSaveImage();
    }
  }, [spookyImageLoaded]);

  //TODO ERROR HANDLING

  const spookyImageMatch = (
    (entry.data?.value || generateSpookyImage.data) as null | string
  )?.match(/https:\/\/res.cloudinary.com\/[^"]+/);

  const spookyImageSource = spookyImageMatch ? spookyImageMatch[0] : null;

  return (
    <div
      onClick={() => setShowSpookyImage(!showSpookyImage)}
      key={album.id}
      className="flex w-full flex-wrap gap-3 rounded-xl bg-white bg-opacity-10 p-5 backdrop-blur-lg backdrop-filter"
    >
      <div className="cursor-pointer">
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={200}>
          <img
            className="h-36 w-36 cursor-pointer rounded"
            style={{
              display: showSpookyImage ? "none" : "block",
            }}
            src={imageSource}
            alt={album.name}
          />
          {!!spookyImageSource && (
            <img
              className="h-36 w-36 cursor-pointer rounded"
              style={{
                display:
                  showSpookyImage && spookyImageLoaded ? "block" : "none",
              }}
              src={spookyImageSource}
              alt={album.name}
              onLoad={() => {
                if (!spookyImageLoaded && generateSpookyImage.data) {
                  // setSpookyImageLoaded(true);
                }
              }}
            />
          )}
          {showSpookyImage && !spookyImageLoaded && (
            <div className="flex h-36 w-36 items-center justify-center rounded bg-slate-300 bg-opacity-10">
              <div>
                {generateSpookyImage.data ? (
                  <>
                    <l-quantum
                      size="100"
                      speed="1.75"
                      color="white"
                    ></l-quantum>
                    <p className="text-center">Generating...</p>
                  </>
                ) : (
                  <>
                    <l-ring-2 size="100" speed="1.75" color="white"></l-ring-2>
                    <p className="text-center">Generating...</p>
                  </>
                )}
              </div>
            </div>
          )}
        </Tilt>
      </div>
      <section className="flex h-36 flex-grow flex-col">
        <h4 className="mb-2 text-lg font-semibold leading-none">
          {album.name}
        </h4>
        <ul className="overflow-scroll">
          {tracks.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
          {JSON.stringify(generateSpookyImage.data)}
        </ul>
      </section>
    </div>
  );
}
