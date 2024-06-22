'use client';
import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { IoArrowBack } from 'react-icons/io5';
import anime from 'animejs';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
export default function Resume() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isAnimationComplete, setAnimationComplete] = useState<boolean>(false); // State to track animation completion

  useEffect(() => {
    // Initial animation on component mount
    animateIn();
  }, []);

  const animateIn = () => {
    setAnimationComplete(true);

    anime.timeline({ loop: false })
      .add({
        targets: '.animated-text',
        opacity: [0, 1],
        translateX: [-50, 0],
        easing: 'easeOutExpo',
        duration: 500,
        delay: 200
      })
      .add({
        targets: '.about-content',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 500,
        offset: '-=400' // Overlap with previous animation
      })
      .add({
        targets: '.pdf-section',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 500,
        offset: '-=400', // Overlap with previous animation
      })
      .add({
        targets: '.backButton',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 500,
        offset: '-=400', //
      });
  };

  const animateOut = () => {
    anime.timeline({ loop: false })
      .add({
        targets: '.pdf-section, .about-content, .animated-text, .backButton',
        opacity: [1, 0],
        translateY: [0, -20],
        easing: 'easeOutExpo',
        duration: 200,
        offset: '-=400', // Overlap with previous animation
        complete: () => {
          window.location.href = "/";
        }
      })
  };

  const handleBackClick = () => {
    animateOut();
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <main className="min-h-screen px-20 pt-16 overflow-none">

        <button className={`absolute top-4 left-4 text-3xl backButton ${isAnimationComplete ? '' : 'opacity-0'}`} onClick={handleBackClick} >
          <IoArrowBack />
        </button>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 font-sans ${isAnimationComplete ? '' : 'opacity-0'}`}>
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold mb-4 animated-text">
            Nice to meet you! 👋🏾
          </h1>
          <div className="about-content">
            <p className="text-3xl mb-6">
              I’m a recent graduate from the University of Wisconsin-Madison
              majoring in Computer Science and Data Science. I’m currently
              interning as an SWE @ Wayfair.
            </p>
            <p className='text-3xl mb-6'>
              My interests are primarily in Machine Learning and Databases --
              I’m currently building a model with my friends to predict player props
              for Premier League matches.
            </p>
            <p className='text-3xl mb-6'>
              If you’d like to chat, see my contact info below:
            </p>
            <p className='text-3xl mb-6'>
              email: <a className="text-sky-500 underline" href="mailto:kukunoorusvadrut@gmail.com" target="_blank">kukunoorusvadrut@gmail.com</a> <br />
              linkedin: <a className="text-sky-500 underline" href="https://www.linkedin.com/in/svadrut/" target="_blank">linkedin.com/in/svadrut</a> <br />
              github: <a className="text-sky-500 underline" href="https://www.github.com/svadrutk" target="_blank">github.com/svadrutk</a>
            </p>
          </div>
        </div>
        <div className="border rounded shadow-lg h-3/4 overflow-y-scroll pdf-section">
          <Document file="./resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>
      </div>
    </main>
  );
}
