import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import { redirect } from "next/navigation";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const state = process.env.SPOTIFY_STATE as string;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const scopes = ["user-library-read", "user-read-private"];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  console.log(authorizeURL);
  redirect(authorizeURL);
}
