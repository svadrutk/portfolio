'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface CampusfyImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CampusfyModalProps {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
  images: CampusfyImage[];
}

export default function CampusfyModal({ isOpen, isVisible, onClose, images }: CampusfyModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out shadow-2xl border border-gray-100 ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 relative z-10">
          <div className="text-center">
            <h3 className="text-3xl font-geist tracking-tight">Campusfy</h3>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-5 right-8 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 w-10 h-10 rounded-full flex items-center justify-center text-xl font-mono"
          >
            ×
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-8 space-y-12">
          {images.map((image, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl border border-gray-200 shadow-md"
                />
              </div>
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="space-y-3">
                  <div className="text-xs font-mono text-gray-400 tracking-wider uppercase">
                    Feature {index + 1}
                  </div>
                  <h4 className="text-2xl font-geist text-gray-900 leading-tight">
                    {image.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal Footer */}
        <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
          <div className="flex justify-center">
            <a 
              href="https://campusfy.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-mono text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white hover:shadow-sm"
            >
              Visit Campusfy <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}