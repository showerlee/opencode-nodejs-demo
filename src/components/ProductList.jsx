import ProductItem from './ProductItem';

function ProductList({ products, onUpdate, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <p>No products found. Add your first product!</p>
      </div>
    );
  }

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = products.length > 0 ? totalValue / products.length : 0;

  return (
    <div className="product-list">
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Total Products:</span>
          <span className="stat-value">{products.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Value:</span>
          <span className="stat-value">${totalValue.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Price:</span>
          <span className="stat-value">${averagePrice.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="product-grid">
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;