"use client";
import { TypographyH1 } from "./h1";
import { TypographyH2 } from "./h2";

export default function UserShowcase({
  display_name,
  spookify,
  images,
}: {
  display_name?: string;
  spookify: boolean;
  images?: { url: string }[];
}) {
  const imageSource = images && images[0];
  return (
    <div className="flex w-full gap-2 rounded-xl bg-white bg-opacity-5 px-8 py-16 backdrop-blur-lg backdrop-filter">
      <img
        className="h-32 w-32 rounded-full"
        src={imageSource?.url || "https://via.placeholder.com/150"}
        alt={display_name}
      />
      <div className="font-climateCrisis flex flex-col justify-center">
        <TypographyH1 className="text-3xl font-bold tracking-wide text-lime-600 lg:text-4xl">
          {display_name}
        </TypographyH1>
        <TypographyH1 className="text-3xl font-bold tracking-wide lg:text-4xl">
          {spookify && <span className="text-fuchsia-700">Spooky</span>}{" "}
          Showcase
        </TypographyH1>
      </div>
    </div>
  );
}
