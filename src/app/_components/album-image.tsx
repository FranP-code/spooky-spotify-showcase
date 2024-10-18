import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import ErrorComponent from "./error";

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
  const [loadError, setLoadError] = useState(false);

  const errorValue = error || loadError;

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
        className="h-36 w-36 cursor-pointer rounded-xl"
        style={{
          display: showSpookyImage ? "none" : "block",
        }}
        src={imageSource}
        alt={album.name}
      />
      {loadGeneratedImage && spookyImageSource && !errorValue && (
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
            setLoadError(true);
          }}
        />
      )}
      {showSpookyImage && !spookyImageLoaded && !errorValue && (
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded bg-slate-900 text-base backdrop-blur-3xl">
          {(() => {
            if (generateSpookyImageData) {
              if (onQueue) {
                return (
                  <>
                    <l-pulsar size="75" speed="1.75" color="white"></l-pulsar>{" "}
                    <p className="text-center">On queue...</p>
                  </>
                );
              }
              return (
                <>
                  <l-quantum size="75" speed="1.75" color="white"></l-quantum>
                  <p className="text-center">Generating...</p>
                </>
              );
            } else {
              return (
                <>
                  <l-ring-2 size="75" speed="1.75" color="white"></l-ring-2>
                  <p className="text-center">Getting image...</p>
                </>
              );
            }
          })()}
        </div>
      )}
      {errorValue && showSpookyImage && (
        <div className="flex h-36 w-36 items-center justify-center rounded-xl bg-slate-900">
          <ErrorComponent />
        </div>
      )}
    </Tilt>
  );
}

export default AlbumImage;
