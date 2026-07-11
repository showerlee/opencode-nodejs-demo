import { useState } from 'react';

function AddProduct({ onAdd }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!productData.name.trim() || !productData.price) {
      alert('Product name and price are required');
      return;
    }

    const priceValue = parseFloat(productData.price);
    if (isNaN(priceValue) || priceValue < 0) {
      alert('Please enter a valid price');
      return;
    }

    const productToAdd = {
      name: productData.name.trim(),
      description: productData.description.trim(),
      price: priceValue
    };

    setSubmitting(true);
    try {
      await onAdd(productToAdd);
      setProductData({
        name: '',
        description: '',
        price: ''
      });
    } catch (error) {
      console.error('Failed to add product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <div className="form-group">
        <label htmlFor="productName">
          <span style={{ display: 'inline-block', marginRight: '8px' }}>📦</span>
          Product Name *
        </label>
        <input
          type="text"
          id="productName"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Enter product name (e.g., Smartphone, Laptop)"
          className="product-input"
          disabled={submitting}
          required
          style={{ transition: 'all 0.3s ease' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productDescription">
          <span style={{ display: 'inline-block', marginRight: '8px' }}>📝</span>
          Description
        </label>
        <textarea
          id="productDescription"
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Describe your product (optional)"
          className="product-textarea"
          disabled={submitting}
          rows="3"
          style={{ transition: 'all 0.3s ease' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productPrice">
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
            id="productPrice"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="product-input"
            disabled={submitting}
            required
            style={{ paddingLeft: '40px', transition: 'all 0.3s ease' }}
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="add-btn"
        disabled={!productData.name.trim() || !productData.price || submitting}
        style={{
          opacity: (!productData.name.trim() || !productData.price) ? 0.6 : 1,
          transition: 'all 0.3s ease'
        }}
      >
        {submitting ? (
          <>
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '8px' }}>
              ⏳
            </span>
            Adding Product...
          </>
        ) : (
          '🚀 Add Product'
        )}
      </button>
    </form>
  );
}

export default AddProduct;