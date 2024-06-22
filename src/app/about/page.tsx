'use client';
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { IoArrowBack } from 'react-icons/io5';
import anime from 'animejs';
import 'core-js/features/promise/';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Resume() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isAnimationComplete, setAnimationComplete] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    // Initial animation on component mount
    animateIn();

    // Check screen size on mount
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

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
        offset: '-=400'
      })
      .add({
        targets: '.pdf-section',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 500,
        offset: '-=400',
      })
      .add({
        targets: '.backButton',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 500,
        offset: '-=400',
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
        offset: '-=400',
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
    <main className="min-h-screen px-8 pt-12 md:px-20 md:pt-20 overflow-none">
      <button className={`top-4 left-2 text-center md:top-4 md:left-4 text-xl md:text-2xl lg:text-3xl absolute backButton ${isAnimationComplete ? '' : 'opacity-0'}`} onClick={handleBackClick} >
        <IoArrowBack />
      </button>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 font-sans ${isAnimationComplete ? '' : 'opacity-0'}`}>
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animated-text">
            Nice to meet you! 👋🏾
          </h1>
          <div className="about-content">
            <p className="text-xl md:text-2xl lg:text-3xl mb-6">
              I’m a recent graduate from the University of Wisconsin-Madison
              majoring in Computer Science and Data Science. I’m currently
              interning as an SWE @ Wayfair.
            </p>
            <p className='text-xl md:text-2xl lg:text-3xl mb-6'>
              My interests are primarily in Machine Learning and Databases --
              I’m currently building a model with my friends to predict player props
              for Premier League matches.
            </p>
            <p className='text-xl md:text-2xl lg:text-3xl mb-6'>
              If you’d like to chat, see my contact info below:
            </p>
            {isSmallScreen ? (
            <p className='text-xl md:text-2xl lg:text-3xl mb-6'>
              email: <a className="text-sky-500 underline truncate" href="mailto:kukunoorusvadrut@gmail.com" target="_blank">kukunoorusvadrut@gmail.com</a> <br />
              linkedin: <a className="text-sky-500 underline" href="https://www.linkedin.com/in/svadrut/" target="_blank">linkedin.com/in/svadrut</a> <br />
              github: <a className="text-sky-500 underline" href="https://www.github.com/svadrutk" target="_blank">github.com/svadrutk</a> <br />
              resume: <a className="text-sky-500 underline" href="https://github.com/svadrutk/college/blob/main/resume/resume.pdf" target="_blank">resume.pdf</a>
            </p>
            ) : (
            <p className='text-xl md:text-2xl lg:text-3xl mb-6'>
              email: <a className="text-sky-500 underline truncate" href="mailto:kukunoorusvadrut@gmail.com" target="_blank">kukunoorusvadrut@gmail.com</a> <br />
              linkedin: <a className="text-sky-500 underline" href="https://www.linkedin.com/in/svadrut/" target="_blank">linkedin.com/in/svadrut</a> <br />
              github: <a className="text-sky-500 underline" href="https://www.github.com/svadrutk" target="_blank">github.com/svadrutk</a> <br />
            </p>
            )}
          </div>
        </div>
        {isSmallScreen ? (
          <p className="text-xl md:text-2xl lg:text-3xl text-center h-3/4 align-middle pdf-section">
          </p>
        ) : (
          <div className="border rounded shadow-lg h-3/4 overflow-y-scroll pdf-section">
            <Document file="./resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>
          </div>
        )}
      </div>
    </main>
  );
}
