import Link from "next/link";
import { TypographyH1 } from "./h1";
import { TypographyH4 } from "./h4";
import SpotifyLogin from "./spotify-login";
import { PlaceholderDataLink } from "./placeholder-data-link";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center pt-4">
      <div className="mb-8 text-center">
        <TypographyH1>Spooky Spotify Showcase</TypographyH1>
        <TypographyH4 className="font-normal opacity-90">
          <a
            className="external-link"
            href="https://cloudinary.com/blog/cloudinary-cloudcreate-spooky-ai-hackathon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>franp-code</code>'s Cloudinary participation
          </a>
        </TypographyH4>
      </div>
      <SpotifyLogin className="grow-0" />
      <PlaceholderDataLink
        className="mt-2"
        text="Don't have an Spotify account? Use mine!"
      />
    </div>
  );
}

export default LoginPage;
