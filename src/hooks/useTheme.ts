import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/** Read the theme already applied to <html> by the inline init script. */
function getInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const current = document.documentElement.getAttribute('data-theme')
    if (current === 'dark' || current === 'light') return current
  }
  return 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, isDark: theme === 'dark', toggle }
}
