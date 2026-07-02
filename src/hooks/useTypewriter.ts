import { useEffect, useState } from 'react'

type Options = {
  typeSpeed?: number
  deleteSpeed?: number
  pauseMs?: number
}

/**
 * Cycles through `words` with a type → pause → delete → next loop.
 * Returns the text currently shown. Respects prefers-reduced-motion by
 * showing the first word statically.
 */
export function useTypewriter(words: string[], options: Options = {}) {
  const { typeSpeed = 130, deleteSpeed = 70, pauseMs = 1500 } = options

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return

    const word = words[index % words.length]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && text === word) {
      // Fully typed → hold, then start deleting.
      timer = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && text === '') {
      // Fully deleted → advance to the next word.
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      const next = deleting
        ? word.slice(0, text.length - 1)
        : word.slice(0, text.length + 1)
      timer = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pauseMs, reduced])

  return reduced ? words[0] : text
}
