"use client";

import { useEffect, useState } from "react";
import { TrackByAlbum } from "./spotify-data";
import { api } from "@/trpc/react";
import { quantum } from "ldrs";
import { ring2 } from "ldrs";
import { pulsar } from "ldrs";
import Swiper from "./swiper";
import { SwiperSlide } from "swiper/react";
import AlbumImage from "./album-image";

pulsar.register();
ring2.register();
quantum.register();

export default function AlbumShowcase({
  spookify,
  album,
  position,
  tracks,
  place,
  lastSpookyImageLoaded,
  setLastSpookyImageLoaded,
}: TrackByAlbum & {
  spookify: boolean;
  place: number;
  lastSpookyImageLoaded: number;
  setLastSpookyImageLoaded: any;
}) {
  const imageSource = album.images[0]
    ? album.images[0].url
    : "https://via.placeholder.com/150";

  const [showSpookyImage, setShowSpookyImage] = useState(spookify);
  const [spookyImageLoaded, setSpookyImageLoaded] = useState(false);

  useEffect(() => {
    setShowSpookyImage(spookify);
  }, [spookify]);

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

  const onImageLoad = () => {
    if (!spookyImageLoaded) {
      setSpookyImageLoaded(true);
      setLastSpookyImageLoaded((state: number) =>
        state > place ? state : place,
      );
    }
  };

  return (
    <div
      key={album.id}
      className="flex w-full flex-wrap gap-3 rounded-xl bg-white bg-opacity-10 p-5 backdrop-blur-lg backdrop-filter"
    >
      <div
        onClick={() => setShowSpookyImage(!showSpookyImage)}
        className="cursor-pointer *:select-none"
      >
        <Swiper>
          <SwiperSlide>
            <AlbumImage
              showSpookyImage={showSpookyImage}
              imageSource={imageSource}
              spookyImageSource={spookyImageSource}
              album={album}
              generateSpookyImageData={generateSpookyImage.data as string}
              lastSpookyImageLoaded={lastSpookyImageLoaded}
              place={place}
              spookyImageLoaded={spookyImageLoaded}
              onImageLoad={onImageLoad}
            />
          </SwiperSlide>
          <SwiperSlide>
            <AlbumImage
              showSpookyImage={showSpookyImage}
              imageSource={imageSource}
              spookyImageSource={spookyImageSource}
              album={album}
              generateSpookyImageData={generateSpookyImage.data as string}
              lastSpookyImageLoaded={lastSpookyImageLoaded}
              place={place}
              spookyImageLoaded={spookyImageLoaded}
              onImageLoad={onImageLoad}
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <section className="flex h-36 flex-grow flex-col">
        <h4 className="mb-2 text-lg font-semibold leading-none">
          {album.name}
        </h4>
        <ul className="overflow-scroll">
          {tracks.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
