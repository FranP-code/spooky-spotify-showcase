import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import SadFaceIcon from "./sad-face-icon";

interface AlbumImageProps {
  number?: number;
  entry: { data: any; isLoading: boolean };
  showSpookyImage: boolean;
  imageSource: string;
  spookyImageSource: string | null;
  album: { name: string };
  generateSpookyImageData: string | null;
  lastSpookyImageLoaded: number;
  place: number;
  loadGeneratedImage: boolean;
  onQueue: boolean;
  saveImage: {
    mutate: (arg0: {
      entry: {
        type: "album" | "artist";
        image: string;
        name: string;
        number?: number;
      };
    }) => void;
  };
  setLastSpookyImageLoaded: (
    arg0: number | ((state: number) => number),
  ) => void;
  error: boolean;
}

export function AlbumImage({
  number,
  entry,
  showSpookyImage,
  imageSource,
  spookyImageSource,
  album,
  generateSpookyImageData,
  lastSpookyImageLoaded,
  place,
  loadGeneratedImage,
  onQueue,
  saveImage,
  setLastSpookyImageLoaded,
  error,
}: AlbumImageProps) {
  const [spookyImageLoaded, setSpookyImageLoaded] = useState(false);

  const handleSaveImage = async () => {
    if (!entry.data && !entry.isLoading) {
      saveImage.mutate({
        entry: {
          type: "album",
          image: imageSource,
          name: album.name,
          number,
        },
      });
    }
  };

  useEffect(() => {
    if (spookyImageLoaded) {
      handleSaveImage();
    }
  }, [spookyImageLoaded]);

  const onImageLoad = () => {
    if (!spookyImageLoaded) {
      setSpookyImageLoaded(true);
      setLastSpookyImageLoaded((state: number) =>
        state > place ? state : place,
      );
    }
  };

  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={200}>
      <img
        className="h-36 w-36 cursor-pointer rounded"
        style={{
          display: showSpookyImage ? "none" : "block",
        }}
        src={imageSource}
        alt={album.name}
      />
      {loadGeneratedImage && spookyImageSource && !error && (
        <img
          className="h-36 w-36 cursor-pointer rounded"
          style={{
            display: showSpookyImage && spookyImageLoaded ? "block" : "none",
          }}
          src={spookyImageSource}
          alt={album.name}
          onLoad={onImageLoad}
          onError={() => {
            onImageLoad();
          }}
        />
      )}
      {showSpookyImage && !spookyImageLoaded && !error && (
        <div className="flex h-36 w-36 items-center justify-center rounded bg-slate-300 bg-opacity-10">
          <div>
            {(() => {
              if (generateSpookyImageData) {
                if (onQueue) {
                  return (
                    <>
                      <l-pulsar
                        size="100"
                        speed="1.75"
                        color="white"
                      ></l-pulsar>{" "}
                      <p className="text-center">On queue...</p>
                    </>
                  );
                }
                return (
                  <>
                    <l-quantum
                      size="100"
                      speed="1.75"
                      color="white"
                    ></l-quantum>
                    <p className="text-center">Generating...</p>
                  </>
                );
              } else {
                return (
                  <>
                    <l-ring-2 size="100" speed="1.75" color="white"></l-ring-2>
                    <p className="text-center">Getting image...</p>
                  </>
                );
              }
            })()}
          </div>
        </div>
      )}
      {error && (
        <div className="flex h-36 w-36 items-center justify-center rounded bg-slate-300 bg-opacity-10">
          <div>
            <SadFaceIcon className="h-16 w-16" color="white" />
            <p className="text-center">Error</p>
          </div>
        </div>
      )}
    </Tilt>
  );
}

export default AlbumImage;
