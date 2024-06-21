'use client'
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Resume() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <main className="min-h-screen px-20 pt-16 overflow-hidden">
      <Link href="/">
      <button className="absolute top-4 left-4 text-3xl">
        <IoArrowBack />
      </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-sans h-full">
        <div className="flex flex-col h-full">
          <h1 className="text-5xl font-bold mb-4">Nice to meet you! 👋</h1>
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
            If you’d like to chat, see my contact info here.
          </p>
        </div>
        <div className="border rounded shadow-lg h-3/4 overflow-y-scroll">
          <Document file="/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
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
