import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'slooze_auth_user'

const mockUsers = [
  { email: 'manager@slooze.com', password: '123456', role: 'manager' },
  { email: 'store@slooze.com', password: '123456', role: 'storekeeper' },
]

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    setError('')
    const found = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!found) {
      setError('Invalid credentials')
      return false
    }
    const payload = { email: found.email, role: found.role }
    setUser(payload)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return true
  }

  const logout = () => {
    setUser(null)
    setError('')
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      error,
      loading,
      login,
      logout,
      clearError: () => setError(''),
    }),
    [user, error, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}

