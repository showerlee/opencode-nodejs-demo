const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Sample products data matching Java project structure
let products = [
  { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', description: 'Latest smartphone model', price: 699.99 },
  { id: 3, name: 'Headphones', description: 'Noise-cancelling headphones', price: 199.99 }
];

// Health check endpoint matching Java project
app.get('/.well-known/health', (req, res) => {
  const healthData = {
    apiVersion: '1.0.0',
    status: 'OK',
    datetime: new Date().toISOString(),
    hostInstanceId: os.hostname() || 'unknown'
  };
  res.json(healthData);
});

// Hello endpoints matching Java project
app.get('/hello', (req, res) => {
  res.send('Hello from Node.js!');
});

app.get('/greet', (req, res) => {
  res.json({
    title: 'Hello',
    message: 'Welcome to Node.js Demo'
  });
});

// Product API endpoints matching Java project
// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// POST create new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name: req.body.name,
    description: req.body.description || '',
    price: req.body.price
  };
  
  // Validate required fields
  if (!newProduct.name || newProduct.price === undefined) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const updatedProduct = {
    ...products[productIndex],
    name: req.body.name || products[productIndex].name,
    description: req.body.description !== undefined ? req.body.description : products[productIndex].description,
    price: req.body.price !== undefined ? req.body.price : products[productIndex].price
  };
  
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/.well-known/health`);
  console.log(`Hello endpoint: http://localhost:${PORT}/hello`);
  console.log(`Greet endpoint: http://localhost:${PORT}/greet`);
  console.log(`Products API: http://localhost:${PORT}/api/products`);
});