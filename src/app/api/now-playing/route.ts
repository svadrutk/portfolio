import { NextResponse } from 'next/server';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Check if required environment variables are present
const isSpotifyConfigured = SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN;

const basic = isSpotifyConfigured ? Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64') : '';
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Simple cache to avoid repeated failed requests
let lastErrorTime = 0;
const ERROR_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface SpotifyArtist {
  name: string;
  id: string;
  uri: string;
}

async function getAccessToken() {
  if (!isSpotifyConfigured) {
    throw new Error('Spotify credentials not configured');
  }

  try {
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
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${data.error_description || data.error}`);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}

export async function GET() {
  // Return early if Spotify is not configured
  if (!isSpotifyConfigured) {
    return NextResponse.json({ 
      isPlaying: false, 
      error: 'Spotify integration not configured' 
    });
  }

  // Check if we recently had an error and avoid spamming requests
  const now = Date.now();
  if (lastErrorTime && (now - lastErrorTime) < ERROR_CACHE_DURATION) {
    return NextResponse.json({ isPlaying: false });
  }

  try {
    const tokenData = await getAccessToken();
    
    if (!tokenData.access_token) {
      throw new Error('No access token received');
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    // Handle no content (not playing) or errors
    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const text = await response.text();
    
    // Handle empty response
    if (!text) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = JSON.parse(text);
    
    // Reset error cache on successful request
    lastErrorTime = 0;
    
    const isPlaying = song.is_playing;
    const title = song.item?.name;
    const artist = song.item?.artists?.map((_artist: SpotifyArtist) => _artist.name).join(', ');
    const album = song.item?.album?.name;
    const albumArtUrl = song.item?.album?.images?.[0]?.url;
    const trackUrl = song.item?.external_urls?.spotify;
    const progressMs = song.progress_ms;
    const durationMs = song.item?.duration_ms;
    const artistUrl = song.item?.artists?.[0]?.external_urls?.spotify;

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
    // Set error cache to avoid repeated failed requests
    lastErrorTime = Date.now();
    
    // Only log the error once to reduce spam
    if (error instanceof Error && !error.message.includes('Spotify credentials not configured')) {
      console.error('Spotify API error:', error.message);
    }
    
    return NextResponse.json({ isPlaying: false });
  }
} 