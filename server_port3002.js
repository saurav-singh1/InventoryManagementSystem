const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage
let items = [];
let nextId = 1;

// API Routes
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { item_name, quantity, price, category, description } = req.body;
  
  if (!item_name || quantity === undefined || price === undefined) {
    res.status(400).json({ error: 'Missing required fields: item_name, quantity, and price are required' });
    return;
  }

  const newItem = {
    id: nextId++,
    item_name,
    quantity: parseInt(quantity),
    price: parseFloat(price),
    category: category || '',
    description: description || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { item_name, quantity, price, category, description } = req.body;
  
  const itemIndex = items.findIndex(item => item.id === parseInt(id));
  if (itemIndex === -1) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  items[itemIndex] = {
    ...items[itemIndex],
    item_name,
    quantity: parseInt(quantity),
    price: parseFloat(price),
    category,
    description,
    updated_at: new Date().toISOString()
  };

  res.json(items[itemIndex]);
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex(item => item.id === parseInt(id));
  
  if (itemIndex === -1) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  items.splice(itemIndex, 1);
  res.json({ message: 'Item deleted successfully' });
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;