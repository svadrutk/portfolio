'use client';

import { useState, useEffect } from 'react';
import { Music, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import Image from 'next/image';

interface Track {
  title: string;
  artist: string;
  album: string;
  albumArtUrl: string;
  trackUrl: string;
  artistUrl: string;
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch('/api/now-playing');
        const data = await response.json();
        
        if (data.isPlaying) {
          setTrack(data);
          if (data.progressMs && data.durationMs) {
            setProgress((data.progressMs / data.durationMs) * 100);
          }
        } else {
          setTrack(null);
        }
      } catch (error) {
        console.error('Error fetching track:', error);
        setTrack(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrack();
    // Always poll every 2 seconds to catch transitions quickly
    const interval = setInterval(fetchTrack, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <AnimatedSection delay={0.2} className="flex flex-col">
        <div className="flex justify-between h-6">
          <h2 className="text-sm font-mono leading-6">NOW PLAYING</h2>
          <span className="text-xs font-mono text-gray-400 leading-6">[4]</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Music className="w-4 h-4 text-gray-400 animate-pulse" />
          <span className="text-sm text-gray-400">Loading...</span>
        </div>
      </AnimatedSection>
    );
  }

  // Don't render anything if there's no track or it's not playing
  if (!track || !track.isPlaying) {
    return null;
  }

  return (
    <AnimatedSection delay={0.2} className="flex flex-col">
      <div className="flex justify-between h-6">
        <h2 className="text-sm font-mono leading-6">NOW PLAYING</h2>
        <span className="text-xs font-mono text-gray-400 leading-6">[4]</span>
      </div>
      <div className="mt-2 flex items-start gap-4">
        {track.albumArtUrl && (
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={track.albumArtUrl}
              alt={`${track.title} album art`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <a
                href={track.trackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 hover:text-gray-600 transition-colors"
              >
                <span className="font-[&apos;Goudy_Bookletter_1911&apos;] text-sm truncate">{track.title}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={track.artistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-600 transition-colors truncate block"
              >
                {track.artist}
              </a>
              <span className="text-xs text-gray-400 block truncate">{track.album}</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(track.progressMs)}</span>
              <span>{formatTime(track.durationMs)}</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
} 