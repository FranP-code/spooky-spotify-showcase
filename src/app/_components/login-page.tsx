import Link from "next/link";
import { TypographyH1 } from "./h1";
import { TypographyH4 } from "./h4";
import SpotifyLogin from "./spotify-login";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-y-8 pt-4">
      <div className="text-center">
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
    </div>
  );
}

export default LoginPage;
