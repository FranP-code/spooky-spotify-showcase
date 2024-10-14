"use client";
import { TypographyH1 } from "./h1";
import { TypographyH2 } from "./h2";

export default function UserShowcase({
  display_name,
  spookify,
  images,
}: {
  display_name: string;
  spookify: boolean;
  images: { url: string }[];
}) {
  const imageSource = images && images[0];
  return (
    <div className="flex">
      <img
        className="h-16 w-16 rounded-full"
        src={imageSource?.url || "https://via.placeholder.com/150"}
        alt={display_name}
      />
      <div className="ml-2 flex flex-col justify-center">
        <TypographyH2 className="font-bold">
          {display_name} {spookify && "Spooky"} Showcase
        </TypographyH2>
      </div>
    </div>
  );
}
