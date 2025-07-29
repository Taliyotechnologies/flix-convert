import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [isSystem, setIsSystem] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('convertflix-theme')
    const savedSystem = localStorage.getItem('convertflix-system-theme')
    
    if (savedSystem === 'true') {
      setIsSystem(true)
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
    } else if (savedTheme) {
      setTheme(savedTheme)
      setIsSystem(false)
    } else {
      // First load - detect system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
      setIsSystem(true)
      localStorage.setItem('convertflix-system-theme', 'true')
    }
  }, [])

  // Update document data attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    if (!isSystem) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isSystem])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setIsSystem(false)
    localStorage.setItem('convertflix-theme', newTheme)
    localStorage.setItem('convertflix-system-theme', 'false')
  }

  const setSystemTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(systemTheme)
    setIsSystem(true)
    localStorage.setItem('convertflix-system-theme', 'true')
    localStorage.removeItem('convertflix-theme')
  }

  const value = {
    theme,
    isSystem,
    toggleTheme,
    setSystemTheme,
    setTheme: (newTheme) => {
      setTheme(newTheme)
      setIsSystem(false)
      localStorage.setItem('convertflix-theme', newTheme)
      localStorage.setItem('convertflix-system-theme', 'false')
    }
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
} 