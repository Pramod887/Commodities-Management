import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="centered">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const fallback = user.role === 'storekeeper' ? '/products' : '/'
    return <Navigate to={fallback} replace />
  }

  return children
}

export default ProtectedRoute

