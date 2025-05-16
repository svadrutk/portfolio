import { NextResponse } from 'next/server';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

interface SpotifyArtist {
  name: string;
  id: string;
  uri: string;
}

async function getAccessToken() {
  try {
    console.log('Getting access token with refresh token:', SPOTIFY_REFRESH_TOKEN);
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN!,
      }),
    });

    const data = await response.json();
    console.log('Token response:', data);
    
    if (!response.ok) {
      throw new Error(`Failed to get access token: ${JSON.stringify(data)}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const tokenData = await getAccessToken();
    console.log('Token data received:', tokenData);
    
    if (!tokenData.access_token) {
      throw new Error('No access token received');
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const text = await response.text();
    console.log('Spotify API response status:', response.status);
    console.log('Spotify API response:', text);

    if (response.status === 204 || response.status > 400) {
      console.log('Returning isPlaying: false due to status:', response.status);
      return NextResponse.json({ isPlaying: false });
    }

    const song = JSON.parse(text);
    console.log('Parsed song data:', song);
    
    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: SpotifyArtist) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumArtUrl = song.item.album.images[0]?.url;
    const trackUrl = song.item.external_urls.spotify;
    const progressMs = song.progress_ms;
    const durationMs = song.item.duration_ms;
    const artistUrl = song.item.artists[0]?.external_urls.spotify;

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      album,
      albumArtUrl,
      trackUrl,
      artistUrl,
      progressMs,
      durationMs,
    });
  } catch (error) {
    console.error('Error fetching now playing:', error);
    return NextResponse.json({ isPlaying: false });
  }
} 