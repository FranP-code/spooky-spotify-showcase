"use client";

import { MdiSpotify } from "./spotify-icon";

export default function SpotifyLogin() {
  const loginToSpotify = () => {
    window.location.href = "/api/spotify-login";
  };

  return (
    <button
      className="flex items-center justify-center gap-1 rounded-full bg-green-500 py-2 pl-4 pr-5 font-bold text-white hover:bg-green-700"
      onClick={loginToSpotify}
    >
      <MdiSpotify className="h-10 w-10" />
      Login to Spotify
    </button>
  );
}
