import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { products } from '../data/products.js'

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'storekeeper') {
      navigate('/products', { replace: true })
    }
  }, [user, navigate])

  const totalProducts = products.length
  const lowStock = products.filter((p) => p.stock < 20).length
  const categories = new Set(products.map((p) => p.category)).size

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <div className="grid">
        <div className="card stat">
          <p className="muted">Total Products</p>
          <h3>{totalProducts}</h3>
        </div>
        <div className="card stat">
          <p className="muted">Low Stock (&lt; 20)</p>
          <h3>{lowStock}</h3>
        </div>
        <div className="card stat">
          <p className="muted">Total Categories</p>
          <h3>{categories}</h3>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

