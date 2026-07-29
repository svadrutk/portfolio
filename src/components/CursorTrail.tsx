'use client';

import { useEffect, useState, useRef } from 'react';

const CHARS = '01<>/\\|*+=~-#$%'.split('');
let uid = 0;

interface Particle {
  id: number;
  x: number;
  y: number;
  c: string;
}

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      // only spawn once the cursor has moved ~18px since the last char
      if (dx * dx + dy * dy < 18 * 18) return;
      last.current = { x: e.clientX, y: e.clientY };

      const id = uid++;
      const c = CHARS[Math.floor(Math.random() * CHARS.length)];
      setParticles(p => [...p, { id, x: e.clientX, y: e.clientY, c }]);
      // remove after the fade animation finishes
      setTimeout(() => setParticles(p => p.filter(q => q.id !== id)), 800);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map(p => (
        <span key={p.id} className="trail-char" style={{ left: p.x, top: p.y }}>
          {p.c}
        </span>
      ))}
    </div>
  );
}
