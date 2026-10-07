'use client';

import { ArrowUpRight, Copy } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { useRouter } from 'next/navigation';
import { useTransition, useState, useEffect, useLayoutEffect, useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const headingSlotRef = useRef<HTMLDivElement>(null);
  const [introOffset, setIntroOffset] = useState<{ x: number; y: number } | null>(null);
  const [settled, setSettled] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [toast, setToast] = useState('');
  const [toastId, setToastId] = useState(0);
  const reduceMotion = useReducedMotion();
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = 'kukunoorusvadrut@gmail.com';

  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  const handleCopyEmail = async () => {
    let message = 'copied!';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      message = 'Could not copy. Please try again.';
    }
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    setToastId(id => id + 1);
    toastTimerRef.current = setTimeout(() => setToast(''), 2500);
  };

  const fullText = "Hi, I'm Swad";

  useLayoutEffect(() => {
    const measure = () => {
      if (!headingSlotRef.current) return;
      const rect = headingSlotRef.current.getBoundingClientRect();
      setIntroOffset({
        x: window.innerWidth / 2 - (rect.left + rect.width / 2),
        y: window.innerHeight / 2 - (rect.top + rect.height / 2),
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push('/blog');
    });
  };

  useEffect(() => {
    if (!settled) return;
    const t = setTimeout(() => setRevealed(true), 750);
    return () => clearTimeout(t);
  }, [settled]);

  const heading = (
    <motion.h1
      initial={false}
      animate={settled ? { x: 0, y: 0 } : (introOffset ?? { x: 0, y: 0 })}
      style={{ visibility: introOffset ? 'visible' : 'hidden' }}
      transition={{ type: 'tween', duration: settled ? 0.8 : 0, ease: [0.22, 1, 0.36, 1] }}
      className="text-6xl font-garamond font-normal italic relative z-10 w-fit whitespace-nowrap"
    >
      <span className="inline-flex items-center whitespace-nowrap">
        <span>
          {fullText.split(' ').map((word, index) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onAnimationComplete={index === 2 ? () => setSettled(true) : undefined}
              transition={{ duration: 1, delay: [0, 0.64, 0.96][index], ease: [0.22, 1, 0.36, 1] }}
            >
              {word}{index < 2 ? '\u00a0' : ''}
            </motion.span>
          ))}
        </span>
      </span>
    </motion.h1>
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-6">
        <div className="grid gap-8 py-8">
          <div ref={headingSlotRef} className="w-fit">{heading}</div>

          <AnimatedSection delay={0} active={revealed}>
            <p className="text-gray-600 leading-relaxed">
               I build products that make people&apos;s lives easier. I studied CS and Data Science at UW–Madison, where I co-founded{' '}
              <a href="https://campusfy.app" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Campusfy
              </a>{' '}
              — helping students discover classes and plan degrees. I also built{' '}
              <a href="https://trackhuntr.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                TrackHuntr
              </a>{' '}
              for EDM fans and{' '}
              <a href="https://chorusboard.app" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                Chorusboard
              </a>{' '}
              for song rankings. Currently an FDE at{' '}
              <a href="https://speakeasy.com" target="_blank" rel="noopener noreferrer" className="speakeasy-link font-medium">
                Speakeasy
              </a>
              .
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15} active={revealed}>
            <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg text-gray-500 mb-3 font-mono">LINKS</h2>
              <div className="space-y-1">
                <a href="https://linkedin.com/in/svadrut" target="_blank" rel="noopener noreferrer" className="cursor-target flex justify-between items-center group text-gray-500 hover:text-gray-900 transition-colors">
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 transition-colors" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cursor-target flex justify-between items-center group text-gray-500 hover:text-gray-900 transition-colors">
                  <span>Resumé</span>
                  <ArrowUpRight className="w-4 h-4 transition-colors" />
                </a>
                <a href="/blog" onClick={handleBlogClick} className="cursor-target flex justify-between items-center group text-gray-500 hover:text-gray-900 transition-colors">
                  <span className={isPending ? 'opacity-50' : ''}>Blog</span>
                  <ArrowUpRight className={`w-4 h-4 transition-colors ${isPending ? 'opacity-50' : ''}`} />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-lg text-gray-500 mb-3 font-mono">TEAMS</h2>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span>Speakeasy</span>
                  <span className="text-gray-500">2026-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Wayfair</span>
                  <span className="text-gray-500">2024-2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Campusfy</span>
                  <span className="text-gray-500">2025-</span>
                </div>
              </div>
            </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} active={revealed}>
            <div className="border-t border-gray-300 pt-6 text-center">
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={`Copy email address: ${email}`}
                className="cursor-target group relative text-sm text-gray-600 hover:text-gray-900 transition-colors font-mono rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
              >
                kukunoorusvadrut [at] gmail [dot] com
                <Copy
                  aria-hidden="true"
                  className="absolute left-full top-1/2 ml-2 h-4 w-4 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <AnimatePresence mode="wait">
          {toast && (
            <motion.div
              key={toastId}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="toast-gradient-glow"
            >
              <div className="toast-gradient-border relative overflow-hidden rounded-lg border border-transparent bg-neutral-950/85 px-5 py-3 text-foreground shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <span className="font-mono text-sm tracking-wide">{toast}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
