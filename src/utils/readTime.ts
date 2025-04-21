export function calculateReadTime(content: string): string {
  // Average reading speed in words per minute
  const WORDS_PER_MINUTE = 200;
  
  // Remove markdown syntax and count words
  const text = content
    .replace(/[#*`~]/g, '') // Remove markdown syntax
    .replace(/\s+/g, ' ')   // Normalize whitespace
    .trim();
  
  const wordCount = text.split(' ').length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  return minutes.toString();
} 