import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ServerStatus from './components/ServerStatus';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Failed to add product');
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Failed to update product');
      const updatedProduct = await response.json();
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Product Management System</h1>
        <p>Node.js + React Demo - Matching Java Project Interface</p>
      </header>

      <main className="main">
        <div className="dashboard">
          <div className="server-section">
            <ServerStatus />
          </div>
          
          <div className="products-section">
            <AddProduct onAdd={addProduct} />
            
            {error && (
              <div className="error">
                Error: {error}
                <button onClick={fetchProducts}>Retry</button>
              </div>
            )}
            
            {loading ? (
              <div className="loading">
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  Loading products...
                </div>
                <div style={{ 
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  animation: 'pulse 2s infinite'
                }}>
                  Please wait while we fetch your products 🚀
                </div>
              </div>
            ) : (
              <ProductList 
                products={products} 
                onUpdate={updateProduct} 
                onDelete={deleteProduct} 
              />
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Built with React, Node.js, Express, and Vite | Compatible with Java Spring Boot API</p>
      </footer>
    </div>
  );
}

export default App;