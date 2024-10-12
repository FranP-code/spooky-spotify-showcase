import React from "react";
import Tilt from "react-parallax-tilt";

interface AlbumImageProps {
  showSpookyImage: boolean;
  imageSource: string;
  spookyImageSource: string | null;
  album: { name: string };
  generateSpookyImageData: string | null;
  lastSpookyImageLoaded: number;
  place: number;
  spookyImageLoaded: boolean;
  onImageLoad: () => void;
}

export function AlbumImage({
  showSpookyImage,
  imageSource,
  spookyImageSource,
  album,
  generateSpookyImageData,
  lastSpookyImageLoaded,
  place,
  spookyImageLoaded,
  onImageLoad,
}: AlbumImageProps) {
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
      {spookyImageSource &&
        (generateSpookyImageData
          ? lastSpookyImageLoaded >= place ||
            lastSpookyImageLoaded + 1 === place
          : true) && (
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
      {showSpookyImage && !spookyImageLoaded && (
        <div className="flex h-36 w-36 items-center justify-center rounded bg-slate-300 bg-opacity-10">
          <div>
            {(() => {
              if (generateSpookyImageData) {
                if (lastSpookyImageLoaded < place - 1) {
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
    </Tilt>
  );
}

export default AlbumImage;
