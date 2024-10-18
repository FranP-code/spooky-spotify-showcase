"use client";

import { useEffect, useMemo, useState } from "react";
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
  places,
  lastSpookyImageLoaded,
  setLastSpookyImageLoaded,
}: TrackByAlbum & {
  spookify: boolean;
  places: number[];
  lastSpookyImageLoaded: number;
  setLastSpookyImageLoaded: any;
}) {
  const imageSource = album.images[0]
    ? album.images[0].url
    : "https://via.placeholder.com/150";

  const [showSpookyImage, setShowSpookyImage] = useState(spookify);

  useEffect(() => {
    setShowSpookyImage(spookify);
  }, [spookify]);

  const entry = api.entry.get.useQuery(
    {
      type: "album",
      name: album.name,
      image: imageSource,
    },
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const generateSpookyImage = api.entry.generate.useMutation();
  const generateSecondSpookyImage = api.entry.generate.useMutation();

  const spookyImageSource = useMemo(() => {
    const spookyImageMatch = (
      (entry.data?.value || generateSpookyImage.data) as null | string
    )?.match(/<img\s+src='([^']+)'[^>]*>/);

    return spookyImageMatch && spookyImageMatch[1] ? spookyImageMatch[1] : "";
  }, [entry.data, generateSpookyImage.data]);

  const secondEntry = api.entry.get.useQuery(
    {
      type: "album",
      name: album.name,
      image: spookyImageSource,
      number: 2,
    },
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

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

  const handleSecondGenerateSpookyImage = async () => {
    if (!secondEntry.data && !secondEntry.isLoading && spookyImageSource) {
      generateSecondSpookyImage.mutate({
        entry: {
          type: "album",
          name: album.name,
          image: spookyImageSource,
          number: 2,
        },
      });
    }
  };

  const saveImage = api.entry.save.useMutation();
  const saveSecondImage = api.entry.save.useMutation();

  useEffect(() => {
    handleGenerateSpookyImage();
  }, [entry.data]);

  useEffect(() => {
    handleSecondGenerateSpookyImage();
  }, [secondEntry.data, entry.data]);

  const secondSpookyImageMatch = (
    (secondEntry.data?.value || generateSecondSpookyImage?.data || "") as string
  ).match(/<img\s+src='([^']+)'[^>]*>/);
  const secondSpookyImageSource =
    secondSpookyImageMatch && secondSpookyImageMatch[1]
      ? secondSpookyImageMatch[1]
      : "";

  const firstPlace = places[0] || 0;
  const secondPlace = places[1] || 0;

  const firstImageError = !!(entry.error || generateSpookyImage.error);
  const secondImageError = !!(
    secondEntry.error || generateSecondSpookyImage.error
  );

  return (
    <div
      key={album.id}
      className="flex w-full flex-wrap gap-3 rounded-xl bg-white bg-opacity-10 p-5 backdrop-blur-lg backdrop-filter"
    >
      <div
        onClick={() => setShowSpookyImage(!showSpookyImage)}
        className="mr-2 cursor-pointer *:select-none *:drag-none"
      >
        {showSpookyImage ? (
          <Swiper>
            <SwiperSlide
              className={`shadow-lg ${!showSpookyImage ? "swiper-no-swiping" : ""}`}
            >
              <AlbumImage
                entry={entry}
                showSpookyImage={showSpookyImage}
                imageSource={imageSource}
                spookyImageSource={spookyImageSource}
                album={album}
                generateSpookyImageData={generateSpookyImage.data as string}
                lastSpookyImageLoaded={lastSpookyImageLoaded}
                place={firstPlace}
                loadGeneratedImage={
                  !!(
                    spookyImageSource &&
                    (generateSpookyImage.data
                      ? lastSpookyImageLoaded >= firstPlace ||
                        lastSpookyImageLoaded + 1 === firstPlace
                      : true)
                  )
                }
                onQueue={lastSpookyImageLoaded < firstPlace - 1}
                saveImage={saveImage}
                setLastSpookyImageLoaded={setLastSpookyImageLoaded}
                error={firstImageError}
              />
            </SwiperSlide>
            <SwiperSlide
              className={`shadow-lg ${!showSpookyImage ? "swiper-no-swiping" : ""}`}
            >
              <AlbumImage
                number={2}
                entry={secondEntry}
                showSpookyImage={showSpookyImage}
                imageSource={imageSource}
                spookyImageSource={secondSpookyImageSource}
                album={album}
                generateSpookyImageData={
                  generateSecondSpookyImage.data as string
                }
                lastSpookyImageLoaded={lastSpookyImageLoaded}
                place={secondPlace}
                loadGeneratedImage={
                  !!(
                    secondSpookyImageSource &&
                    (generateSecondSpookyImage.data
                      ? lastSpookyImageLoaded >= secondPlace ||
                        lastSpookyImageLoaded + 1 === secondPlace
                      : true)
                  )
                }
                onQueue={lastSpookyImageLoaded < secondPlace - 1}
                saveImage={saveSecondImage}
                setLastSpookyImageLoaded={setLastSpookyImageLoaded}
                error={secondImageError}
              />
            </SwiperSlide>
          </Swiper>
        ) : (
          <AlbumImage
            entry={entry}
            showSpookyImage={showSpookyImage}
            imageSource={imageSource}
            spookyImageSource={spookyImageSource}
            album={album}
            generateSpookyImageData={generateSpookyImage.data as string}
            lastSpookyImageLoaded={lastSpookyImageLoaded}
            place={firstPlace}
            loadGeneratedImage={
              !!(
                spookyImageSource &&
                (generateSpookyImage.data
                  ? lastSpookyImageLoaded >= firstPlace ||
                    lastSpookyImageLoaded + 1 === firstPlace
                  : true)
              )
            }
            onQueue={lastSpookyImageLoaded < firstPlace - 1}
            saveImage={saveImage}
            setLastSpookyImageLoaded={setLastSpookyImageLoaded}
            error={firstImageError}
          />
        )}
      </div>
      <section className="flex h-36 flex-grow flex-col">
        <h4 className="mb-2 text-lg font-semibold leading-none">
          {album.name}
        </h4>
        <ul className="max-h-[400px] overflow-auto overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
          {tracks.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
