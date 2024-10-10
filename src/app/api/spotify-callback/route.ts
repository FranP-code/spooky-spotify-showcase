import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export async function GET(req: NextApiRequest) {
  if (!req.url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
    const headersList = headers();
    const host = headersList.get("host");

    const data = await spotifyApi.authorizationCodeGrant(code as string);
    const accessToken = data.body["access_token"];
    const refreshToken = data.body["refresh_token"];

    return NextResponse.redirect(
      `http://${host}/?access_token=${accessToken}&refresh_token=${refreshToken}`,
    );
  } catch (err) {
    console.error("Error during Spotify callback:", err);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
