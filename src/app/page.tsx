'use client'
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
      })
      .add({
        targets: '.button-animation',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 500,
        delay: 200 // stagger buttons
      });
  }, []);

  const animateOut = () => {
    anime.timeline({ loop: false })
      .add({
        targets: '.text-animation, .button-animation',
        opacity: [1, 0],
        translateY: [0, -20],
        easing: 'easeOutExpo',
        duration: 200,
        offset: '-=400', // Overlap with previous animation
      })
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center h-full font-grotesk">
        <div className="text-8xl text-animation opacity-0">
          hi. i&apos;m swad.
        </div>
        <div className="flex space-x-4 mt-8 text-4xl font-mono button-animation opacity-0">
          <Link href="/about">
            <button className="bg-black-500 border-solid border-2 border-white text-white font-bold py-4 px-20 rounded hover:border-sky-500 hover:text-sky-500 transition" onClick={animateOut}>
              about
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
