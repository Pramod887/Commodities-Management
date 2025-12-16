import { useMemo, useState } from 'react'
import { products as initialProducts } from '../data/products.js'
import { useAuth } from '../context/AuthContext.jsx'

function Products() {
  const { user } = useAuth()
  const [items, setItems] = useState(initialProducts)
  const [form, setForm] = useState({ id: null, name: '', price: '', stock: '', category: '' })
  const [error, setError] = useState('')

  const isEditing = useMemo(() => form.id !== null, [form.id])

  const resetForm = () => {
    setForm({ id: null, name: '', price: '', stock: '', category: '' })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || form.price === '' || form.stock === '' || !form.category.trim()) {
      setError('All fields are required')
      return
    }
    const price = Number(form.price)
    const stock = Number(form.stock)
    if (Number.isNaN(price) || Number.isNaN(stock) || price < 0 || stock < 0) {
      setError('Price and stock must be positive numbers')
      return
    }

    if (isEditing) {
      setItems((prev) => prev.map((p) => (p.id === form.id ? { ...p, ...form, price, stock } : p)))
    } else {
      const nextId = Math.max(...items.map((p) => p.id)) + 1
      setItems((prev) => [...prev, { ...form, id: nextId, price, stock }])
    }
    resetForm()
  }

  const startEdit = (item) => {
    setForm({
      id: item.id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      category: item.category,
    })
    setError('')
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="muted">Welcome {user?.email}</p>
          <h2>Products</h2>
        </div>
        <span className="badge">{items.length} items</span>
      </div>

      <div className="grid two-columns">
        <div className="card">
          <h3>{isEditing ? 'Edit Product' : 'Add Product'}</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Rice"
              />
            </label>
            <label>
              Price
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="20"
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                placeholder="50"
              />
            </label>
            <label>
              Category
              <input
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Grains"
              />
            </label>
            {error && <div className="error">{error}</div>}
            <div className="form-actions">
              <button type="submit" className="primary">
                {isEditing ? 'Update' : 'Add'}
              </button>
              {isEditing && (
                <button type="button" className="ghost" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card">
          <h3>Inventory</h3>
          <div className="table">
            <div className="row header">
              <span>Name</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Action</span>
            </div>
            {items.map((item) => (
              <div className="row" key={item.id}>
                <span>{item.name}</span>
                <span>{item.category}</span>
                <span>${item.price}</span>
                <span className={item.stock < 20 ? 'warn' : ''}>{item.stock}</span>
                <span>
                  <button type="button" className="link" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products

