import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const { user, login, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Always start with empty fields; prevents browser-stored credentials from populating
    setEmail('')
    setPassword('')
  }, [])

  useEffect(() => {
    if (user) {
      navigate(user.role === 'manager' ? '/dashboard' : '/products', { replace: true })
    }
  }, [user, navigate])

  useEffect(() => {
    clearError()
    setFormError('')
  }, [email, password, clearError])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setFormError('Email and password are required')
      return
    }
    const ok = login(email.trim(), password.trim())
    if (ok) {
      const redirectPath = location.state?.from?.pathname || (email === 'manager@slooze.com' ? '/dashboard' : '/products')
      navigate(redirectPath, { replace: true })
    }
  }

  return (
    <div className="auth-container">
      <div className="card">
        <h1>Commodities Management</h1>
        <p className="muted">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="form" autoComplete="off">
          <label htmlFor="login-email">
            Email
            <input
              id="login-email"
              type="email"
              name="noautofill-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              required
            />
          </label>
          <label htmlFor="login-password">
            Password
            <input
              id="login-password"
              type="password"
              name="noautofill-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
          </label>
          {(formError || error) && <div className="error">{formError || error}</div>}
          <button type="submit" className="primary block">
            Login
          </button>
        </form>
        <div className="hint">
          <p>Manager: manager@slooze.com / 123456</p>
          <p>Store Keeper: store@slooze.com / 123456</p>
        </div>
      </div>
    </div>
  )
}

export default Login

