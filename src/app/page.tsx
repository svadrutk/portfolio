'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ANIMATION_DURATION = 1 // total duration in seconds

const AnimatedCharacters = ({ text, totalCharacters, startIndex = 0 }: { text: string, totalCharacters: number, startIndex?: number }) => {
  const characters = text.split("")
  const stepDelay = ANIMATION_DURATION / totalCharacters
  
  return (
    <span>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: (startIndex + index) * stepDelay,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

const AnimatedLink = ({ href, text, className, totalCharacters, startIndex }: { 
  href: string, 
  text: string, 
  className?: string,
  totalCharacters: number,
  startIndex: number 
}) => (
  <Link 
    href={href} 
    className={className}
    target="_blank"
    rel="noopener noreferrer"
  >
    <AnimatedCharacters text={text} totalCharacters={totalCharacters} startIndex={startIndex} />
  </Link>
)

export default function Home() {
  const firstLine = "hi. i'm swad. building "
  const campusfyText = "campusfy"
  const restFirstLine = ". swe @ wayfair."
  const emailLine = "contact me at kukunoorusvadrut [at] gmail [dot] com"
  const linkedinText = "linkedin"
  const githubText = "github"
  const resumeText = "resume"

  const totalCharacters = firstLine.length + campusfyText.length + restFirstLine.length + 
    emailLine.length + linkedinText.length + githubText.length + resumeText.length

  let currentIndex = 0

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[80%] px-5 text-center mx-auto">
        <p className="mb-4 text-base sm:text-lg">
          <AnimatedCharacters 
            text={firstLine} 
            totalCharacters={totalCharacters} 
            startIndex={currentIndex} 
          />
          {(() => {
            currentIndex += firstLine.length
            return (
              <AnimatedLink 
                href="https://campusfy.app" 
                text={campusfyText}
                className="underline hover:opacity-70"
                totalCharacters={totalCharacters}
                startIndex={currentIndex}
              />
            )
          })()}
          {(() => {
            currentIndex += campusfyText.length
            return (
              <AnimatedCharacters 
                text={restFirstLine} 
                totalCharacters={totalCharacters} 
                startIndex={currentIndex} 
              />
            )
          })()}
        </p>
        <p className="mb-6 text-base sm:text-lg">
          {(() => {
            currentIndex += restFirstLine.length
            return (
              <AnimatedCharacters 
                text={emailLine} 
                totalCharacters={totalCharacters} 
                startIndex={currentIndex} 
              />
            )
          })()}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {(() => {
            currentIndex += emailLine.length
            return (
              <AnimatedLink
                href="https://linkedin.com/in/svadrut"
                text={linkedinText}
                className="underline hover:opacity-70"
                totalCharacters={totalCharacters}
                startIndex={currentIndex}
              />
            )
          })()}
          {(() => {
            currentIndex += linkedinText.length
            return (
              <AnimatedLink
                href="https://github.com/svadrutk"
                text={githubText}
                className="underline hover:opacity-70"
                totalCharacters={totalCharacters}
                startIndex={currentIndex}
              />
            )
          })()}
          {(() => {
            currentIndex += githubText.length
            return (
              <AnimatedLink
                href="/resume.pdf"
                text={resumeText}
                className="underline hover:opacity-70"
                totalCharacters={totalCharacters}
                startIndex={currentIndex}
              />
            )
          })()}
        </div>
      </div>
    </main>
  )
}
