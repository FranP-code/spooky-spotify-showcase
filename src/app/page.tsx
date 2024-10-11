import Link from "next/link";
import { api, HydrateClient } from "@/trpc/server";
import SpotifyLogin from "./_components/spotify-login";
import SpotifyData from "./_components/spotify-data";
import SpotifyWebApi from "spotify-web-api-node";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const hello = await api.post.hello({ text: "from tRPC" });

  const access_token = searchParams?.access_token;
  const refresh_token = searchParams?.refresh_token;
  let userIsLogged = !!(
    access_token &&
    refresh_token &&
    typeof access_token === "string" &&
    typeof refresh_token === "string"
  );

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });

  if (userIsLogged)
    try {
      spotifyApi.setAccessToken(access_token as string);
      await spotifyApi.getMe();
    } catch (error) {
      console.error(error);
      userIsLogged = false;
    }
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="justify-centerbg-gradient-to-r flex min-h-screen flex-col items-center bg-gradient-to-r from-slate-900 to-slate-700 text-slate-200">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 pb-16 pt-8">
          {userIsLogged ? (
            <SpotifyData
              accessToken={access_token as string}
              refreshToken={refresh_token as string}
            />
          ) : (
            <SpotifyLogin />
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
