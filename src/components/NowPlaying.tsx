'use client';

import { useState, useEffect } from 'react';
import { Music } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface Track {
  title: string;
  artist: string;
  isPlaying: boolean;
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch('/api/now-playing');
        const data = await response.json();
        setTrack(data);
      } catch (error) {
        console.error('Error fetching track:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

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

  if (!track) {
    return null;
  }

  return (
    <AnimatedSection delay={0.2} className="flex flex-col">
      <div className="flex justify-between h-6">
        <h2 className="text-sm font-mono leading-6">NOW PLAYING</h2>
        <span className="text-xs font-mono text-gray-400 leading-6">[4]</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Music className={`w-4 h-4 ${track.isPlaying ? 'text-green-500' : 'text-gray-400'}`} />
        <div className="flex flex-col">
          <span className="font-[&apos;Goudy_Bookletter_1911&apos;] text-sm">{track.title}</span>
          <span className="text-xs text-gray-500">{track.artist}</span>
        </div>
      </div>
    </AnimatedSection>
  );
} 