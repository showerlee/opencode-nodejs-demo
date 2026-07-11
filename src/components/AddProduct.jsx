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
        <label htmlFor="productName">Product Name *</label>
        <input
          type="text"
          id="productName"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="product-input"
          disabled={submitting}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="productDescription">Description</label>
        <textarea
          id="productDescription"
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          className="product-textarea"
          disabled={submitting}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productPrice">Price *</label>
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
        />
      </div>

      <button 
        type="submit" 
        className="add-btn"
        disabled={!productData.name.trim() || !productData.price || submitting}
      >
        {submitting ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
}

export default AddProduct;