'use client';

import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CampusfyModal from '@/components/CampusfyModal';
import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // Small delay to ensure DOM is updated before animation starts
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const campusfyImages = [
    { 
      src: '/campusfy/advisor.png', 
      alt: 'Campusfy advisor feature', 
      title: 'AI Course Advisor',
      description: 'Get personalized course recommendations based on your interests, academic goals, and scheduling preferences.'
    },
    { 
      src: '/campusfy/class.png', 
      alt: 'Campusfy class details', 
      title: 'Detailed Course Info',
      description: 'Access comprehensive course information including ratings, workload, prerequisites, and student reviews.'
    },
    { 
      src: '/campusfy/search.png', 
      alt: 'Campusfy search interface', 
      title: 'Smart Course Search',
      description: 'Filter and search through thousands of courses with advanced filters for credits, difficulty, and more.'
    }
  ];

  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push('/blog');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-4">
        <div className="grid gap-5 font-serif py-8 md:py-0">
          {/* First row - full width */}
          <AnimatedSection delay={0.2} className="border-b border-gray-200">
            <div className="flex justify-between h-6 mb-4">
              <h1 className="text-3xl leading-6">Swad&apos;s Home</h1>
              <span className="text-xs font-mono text-gray-400 leading-6">[1]</span>
            </div>
            <p className="text-md mb-5">I like building products that make people&apos;s lives easier.
I studied Computer Science and Data Science at UW–Madison and co-founded <span className="font-bold bg-red-400 px-2 py-1 mr-1 text-black rounded"><a href="https://campusfy.app" target="_blank" rel="noopener noreferrer">Campusfy</a></span> — a platform helping students discover the right classes and plan their degrees with confidence. I care about fast feedback loops, intuitive user experiences, and turning scrappy ideas into real, working software.
I currently work on the Knowledge Management team at <span className="font-bold bg-purple-400 px-2 py-1 mr-1 text-black rounded">Wayfair</span>, designing and implementing agents that help teams find and share information more effectively.</p>
          </AnimatedSection>
          
          {/* Second row - split into two columns */}
          <AnimatedSection delay={0.4} className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 relative">
            {/* Left column */}
            <AnimatedSection delay={0.6} className="flex flex-col">
              <div className="flex justify-between h-6">
                <h2 className="text-sm font-mono leading-6">LINKS</h2>
                <span className="text-xs font-mono text-gray-400 leading-6">[2]</span>
              </div>
              <div className="mt-2">
                <a href="https://linkedin.com/in/svadrut" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;]">Linkedin</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;]">Resumé</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </a>
                <a href="/blog" onClick={handleBlogClick} className="flex justify-between items-center group">
                  <span className={`font-[&apos;Goudy_Bookletter_1911&apos;] ${isPending ? 'opacity-50' : ''} transition-opacity duration-200`}>Blog</span>
                  <ArrowUpRight className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all ${isPending ? 'opacity-50' : ''}`} />
                </a>
              </div>
            </AnimatedSection>
            
            {/* Right column */}
            <AnimatedSection delay={0.8} className="flex flex-col">
              <div className="flex justify-between h-6 items-center">
                <h2 className="text-sm font-mono leading-6">TEAMS</h2>
                <span className="text-xs font-mono text-gray-400 leading-6">[3]</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;] leading-6">Campusfy <span className="text-sm font-mono leading-6">(2025-)</span></span>
                  <div className="w-2 h-2 bg-red-500 border border-black border-1 mr-1"></div>
                </div>
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;]">Wayfair <span className="text-sm font-mono leading-6">(2024-)</span></span>
                  <div className="w-2 h-2 bg-purple-500 border border-black border-1 mr-1"></div>
                </div>
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;] leading-6">Skywater Technology <span className="text-sm font-mono leading-6">(2023)</span></span>
                  <div className="w-2 h-2 bg-lime-600 border border-black border-1 mr-1"></div>
                </div>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Third row - Projects */}
          <AnimatedSection delay={1.0} className="border-t border-gray-200 pt-5 mb-4">
            <div className="flex justify-between h-6 mb-4">
              <h2 className="text-sm font-mono leading-6">PROJECTS</h2>
              <span className="text-xs font-mono text-gray-400 leading-6">[4]</span>
            </div>
            <div className="space-y-3">
              <div className="group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-['Goudy_Bookletter_1911'] text-lg">Campusfy</h3>
                    <p className="text-sm text-gray-600 mt-1">Course discovery platform for university students</p>
                  </div>
                  <a href="https://campusfy.app" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-gray-400 hover:text-gray-600 transition-colors">
                    visit →
                  </a>
                </div>
                <div 
                  className="relative mt-3 group cursor-pointer"
                  onClick={openModal}
                >
                  {/* Stacked images with subtle animations */}
                  <div className="relative transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 z-20">
                    <Image 
                      src="/campusfy/search.png" 
                      alt="Campusfy search interface"
                      width={800}
                      height={500}
                      className="w-full h-[150px] rounded border border-gray-200 shadow-sm object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 -translate-x-2 translate-y-2 transition-all duration-300 hover:translate-x-0 hover:translate-y-0 z-10">
                    <Image 
                      src="/campusfy/class.png" 
                      alt="Campusfy class details"
                      width={800}
                      height={500}
                      className="w-full h-[150px] rounded border border-gray-200 shadow-sm object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 -translate-x-4 translate-y-4 transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 z-0">
                    <Image 
                      src="/campusfy/advisor.png" 
                      alt="Campusfy advisor feature"
                      width={800}
                      height={500}
                      className="w-full h-[150px] rounded border border-gray-200 shadow-sm object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Fourth row - Contact */}
          <AnimatedSection delay={1.2} className="border-t border-gray-200 pt-5">
            <div className="flex">
              <span className="text-sm font-mono text-gray-400">kukunoorusvadrut [at] gmail [dot] com</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Modal */}
      <CampusfyModal
        isOpen={isModalOpen}
        isVisible={isModalVisible}
        onClose={closeModal}
        images={campusfyImages}
      />
    </div>
  );
}
