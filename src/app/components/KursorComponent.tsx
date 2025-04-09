'use client'

import { useEffect } from 'react'
import 'kursor/dist/kursor.css'

export default function KursorComponent() {
  useEffect(() => {
    // Import Kursor dynamically since it's a client-side only package
    import('kursor').then(({ default: Kursor }) => {
      new Kursor({
        type: 1,
        removeDefaultCursor: true,
        color: '#000000'
      })
    })
  }, [])

  return null
} 