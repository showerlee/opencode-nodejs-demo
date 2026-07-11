import { useState } from 'react';

function ProductItem({ product, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString()
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (!editData.name.trim() || !editData.price) {
      alert('Product name and price are required');
      return;
    }

    const priceValue = parseFloat(editData.price);
    if (isNaN(priceValue) || priceValue < 0) {
      alert('Please enter a valid price');
      return;
    }

    const updatedProduct = {
      name: editData.name.trim(),
      description: editData.description.trim(),
      price: priceValue
    };

    try {
      await onUpdate(product.id, updatedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: product.name,
      description: product.description,
      price: product.price.toString()
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="product-item editing" style={{ animation: 'fadeIn 0.3s ease' }}>
        <div className="product-edit-form">
          <div className="form-group">
            <label>
              <span style={{ display: 'inline-block', marginRight: '8px' }}>📦</span>
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleEditChange}
              className="product-input"
              required
              autoFocus
              style={{ transition: 'all 0.3s ease' }}
            />
          </div>
          <div className="form-group">
            <label>
              <span style={{ display: 'inline-block', marginRight: '8px' }}>📝</span>
              Description
            </label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleEditChange}
              className="product-textarea"
              rows="2"
              style={{ transition: 'all 0.3s ease' }}
              placeholder="Add a description..."
            />
          </div>
          <div className="form-group">
            <label>
              <span style={{ display: 'inline-block', marginRight: '8px' }}>💰</span>
              Price *
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                $
              </span>
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                step="0.01"
                min="0"
                className="product-input"
                required
                style={{ paddingLeft: '40px', transition: 'all 0.3s ease' }}
              />
            </div>
          </div>
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              💾 Save Changes
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-item" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="product-header">
        <h3 className="product-name">
          <span style={{ display: 'inline-block', marginRight: '10px', fontSize: '1.2rem' }}>
            {product.name.includes('Laptop') ? '💻' : 
             product.name.includes('Phone') ? '📱' :
             product.name.includes('Headphone') ? '🎧' : '📦'}
          </span>
          {product.name}
        </h3>
        <span className="product-price" style={{ animation: 'pulse 2s infinite' }}>
          ${product.price.toFixed(2)}
        </span>
      </div>
      <p className="product-description">
        {product.description || (
          <span style={{ opacity: 0.6, fontStyle: 'italic' }}>
            No description provided
          </span>
        )}
      </p>
      <div className="product-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="edit-btn"
          aria-label="Edit product"
          style={{ transition: 'all 0.3s ease' }}
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
              onDelete(product.id);
            }
          }}
          className="delete-btn"
          aria-label="Delete product"
          style={{ transition: 'all 0.3s ease' }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default ProductItem;