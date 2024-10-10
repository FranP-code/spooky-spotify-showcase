"use client";

export default function SpotifyLogin() {
  const loginToSpotify = () => {
    window.location.href = "/api/spotify-login";
  };

  return (
    <button
      className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      onClick={loginToSpotify}
    >
      Login to Spotify
    </button>
  );
}
