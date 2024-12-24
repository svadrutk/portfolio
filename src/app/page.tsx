'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import anime from "animejs";
import 'core-js/features/promise'; // Example import for Promise polyfill

export default function Page() {
  useEffect(() => {
    // Animate text and buttons sequentially
    anime.timeline({ loop: false })
      .add({
        targets: '.text-animation',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 500,
        delay: 300
      })
      .add({
        targets: '.about',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 500,
      })
      .add({
        targets: '.reads',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 500,
      })
      .add({
        targets: '.mixes',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 500,
      });
  }, []);

  const animateOutAbout = () => {
    anime.timeline({ loop: false })
      .add({
        targets: '.text-animation, .about, .reads, .mixes',
        opacity: [1, 0],
        translateY: [0, -20],
        easing: 'easeOutExpo',
        duration: 200,
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center h-full font-grotesk">
        <div className="text-8xl text-animation opacity-0">
          hi. i&apos;m swad.
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 text-4xl font-mono">
          <Link href="/about">
            <div className="about opacity-0">
              <button className="bg-black-500 border-solid border-2 border-white text-white font-bold py-4 px-20 rounded hover:border-sky-500 hover:text-sky-500 transition" onClick={animateOutAbout}>
                about
              </button>
            </div>
          </Link>
          <Link href="https://goodreads.com/svadrut" target="_blank">
            <div className="reads opacity-0">
              <button className="bg-black-500 border-solid border-2 border-white text-white font-bold py-4 px-20 rounded hover:border-emerald-500 hover:text-emerald-500 transition reads-button-animation">
                reads
              </button>
            </div>
          </Link>
          <Link href="https://on.soundcloud.com/fNMfP5rmv8u5T1qC7" target="_blank">
            <div className="mixes opacity-0">
              <button className="bg-black-500 border-solid border-2 border-white text-white font-bold py-4 px-20 rounded hover:border-orange-500 hover:text-orange-500 transition mixes-button-animation">
                mixes
              </button>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
