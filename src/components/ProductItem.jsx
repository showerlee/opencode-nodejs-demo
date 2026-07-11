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
      <div className="product-item editing">
        <div className="product-edit-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleEditChange}
              className="product-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleEditChange}
              className="product-textarea"
              rows="2"
            />
          </div>
          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleEditChange}
              step="0.01"
              min="0"
              className="product-input"
              required
            />
          </div>
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-item">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-price">${product.price.toFixed(2)}</span>
      </div>
      <p className="product-description">
        {product.description || 'No description provided'}
      </p>
      <div className="product-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="edit-btn"
          aria-label="Edit product"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
              onDelete(product.id);
            }
          }}
          className="delete-btn"
          aria-label="Delete product"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductItem;