import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) return null

  return (
    <nav className="navbar">
      <div className="inner">
        <div className="brand">Commodities MS</div>
        <div className="links">
          {user.role === 'manager' && (
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
          )}
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
            Products
          </NavLink>
        </div>
        <div className="actions">
          <button type="button" className="ghost" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <button type="button" className="primary" onClick={handleLogout}>
            Logout
          </button>
          <span className="role-tag">{user.role}</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

