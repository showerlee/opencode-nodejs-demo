import ProductItem from './ProductItem';

function ProductList({ products, onUpdate, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="empty-state" style={{ animation: 'fadeIn 0.8s ease' }}>
        <div className="empty-icon" style={{ fontSize: '5rem', animation: 'float 3s ease-in-out infinite' }}>
          📦
        </div>
        <p style={{ fontSize: '1.3rem', marginBottom: '1rem', opacity: 0.9 }}>
          No products found
        </p>
        <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>
          Add your first product to get started! 🚀
        </p>
      </div>
    );
  }

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = products.length > 0 ? totalValue / products.length : 0;
  const mostExpensive = products.reduce((max, product) => 
    product.price > max.price ? product : max, products[0]
  );
  const cheapest = products.reduce((min, product) => 
    product.price < min.price ? product : min, products[0]
  );

  return (
    <div className="product-list">
      <div className="stats" style={{ animation: 'slideUp 0.6s ease' }}>
        <div className="stat-item">
          <span className="stat-label">📊 Total Products</span>
          <span className="stat-value" style={{ color: '#4facfe' }}>
            {products.length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">💰 Total Value</span>
          <span className="stat-value" style={{ color: '#00f2fe' }}>
            ${totalValue.toFixed(2)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">📈 Average Price</span>
          <span className="stat-value" style={{ color: '#f093fb' }}>
            ${averagePrice.toFixed(2)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">⭐ Most Expensive</span>
          <span className="stat-value" style={{ 
            color: '#ff758c',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            {mostExpensive.name} (${mostExpensive.price.toFixed(2)})
          </span>
        </div>
      </div>
      
      <div className="product-grid">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            style={{ 
              animation: `fadeIn 0.5s ease ${index * 0.1}s both`,
              transform: `translateY(${index % 2 === 0 ? '0' : '10px'})`
            }}
          >
            <ProductItem
              product={product}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;