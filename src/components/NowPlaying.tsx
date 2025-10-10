'use client';

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
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
      }
    };

    let intervalId: NodeJS.Timeout;
    
    // Delay initial fetch by 3 seconds to let critical content load first
    const initialDelay = setTimeout(() => {
      fetchTrack();
      // Start polling after the initial fetch
      intervalId = setInterval(fetchTrack, 2000);
    }, 3000);

    // Clean up both timeout and interval when component unmounts
    return () => {
      clearTimeout(initialDelay);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Only render if there's a track and it's playing
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
          <div className={`relative w-20 h-20 flex-shrink-0 flex items-center justify-center ${track.isPlaying ? 'animate-spin-slow' : ''}`}>
            {/* Vinyl background */}
            <div className="absolute inset-0 rounded-full border-4 border-black shadow-lg" />
            {/* Album art as label */}
            <Image
              src={track.albumArtUrl}
              alt={`${track.title} album art`}
              fill
              className="object-cover rounded-full"
              style={{ zIndex: 1 }}
            />
            {/* Center dot */}
            <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-gray-200 border border-gray-400 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
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
                <span className="font-geist text-sm truncate">{track.title}</span>
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