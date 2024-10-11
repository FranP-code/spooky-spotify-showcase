"use client";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
// import { AiLoader } from "./ai-loader";
import { quantum } from "ldrs";
import { ring2 } from "ldrs";

ring2.register();
quantum.register();

export default function ArtistShowcase({
  images,
  name,
  id,
}: {
  images: { url: string }[];
  name: string;
  id: string;
}) {
  const [showSpookyImage, setShowSpookyImage] = useState(false);
  const [spookyImageLoaded, setSpookyImageLoaded] = useState(false);

  const imageSource = images[0]
    ? images[0].url
    : "https://via.placeholder.com/150";

  const entry = api.entry.get.useQuery({
    type: "artist",
    name,
    image: imageSource,
  });

  const generateSpookyImage = api.entry.generate.useMutation();
  const saveImage = api.entry.save.useMutation();

  const handleGenerateSpookyImage = async () => {
    if (!entry.data && !entry.isLoading) {
      generateSpookyImage.mutate({
        entry: {
          type: "artist",
          name,
          image: imageSource,
        },
      });
    }
  };

  const handleSaveImage = async () => {
    if (!entry.data && !entry.isLoading) {
      saveImage.mutate({
        entry: {
          type: "artist",
          image: imageSource,
          name,
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

  const spookyImageMatch = (
    (entry.data?.value || generateSpookyImage.data) as null | string
  )?.match(/https:\/\/res.cloudinary.com\/[^"]+/);
  const spookyImageSource = spookyImageMatch ? spookyImageMatch[0] : null;

  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={200}>
      <div
        className="mb-2 w-56 cursor-pointer overflow-hidden rounded-md border-2 border-slate-700 bg-slate-300 bg-opacity-10"
        onClick={() => setShowSpookyImage(!showSpookyImage)}
      >
        <img
          style={{
            display: showSpookyImage ? "none" : "block",
          }}
          className="h-56 w-56 object-fill"
          src={imageSource}
          alt={name}
        />
        {!!spookyImageSource && (
          <img
            style={{
              display: showSpookyImage && spookyImageLoaded ? "block" : "none",
            }}
            className="h-56 w-56 object-fill"
            onLoad={() => {
              if (!spookyImageLoaded) {
                setSpookyImageLoaded(true);
              }
            }}
            src={spookyImageSource}
            alt={name}
          />
        )}
        {showSpookyImage && !spookyImageLoaded && (
          <div className="flex h-56 w-56 items-center justify-center">
            <div>
              {generateSpookyImage.data ? (
                <>
                  <l-quantum size="165" speed="1.75" color="white"></l-quantum>
                  <p className="text-center">Generating...</p>
                </>
              ) : (
                <>
                  <l-ring-2
                    size="165"
                    stroke="5"
                    stroke-length="0.25"
                    bg-opacity="0.1"
                    speed="0.8"
                    color="white"
                  ></l-ring-2>
                  <p className="text-center">Getting image...</p>
                </>
              )}
            </div>
          </div>
        )}
        <p
          className="w-full truncate break-all border-t-2 border-slate-300 bg-slate-200 p-2 text-center text-sm font-medium text-slate-700"
          title={name}
        >
          <span className="cursor-default">{name}</span>
        </p>
      </div>
    </Tilt>
  );
}
