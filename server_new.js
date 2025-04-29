const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3001; // Hardcoded port to avoid any issues

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
const db = new sqlite3.Database('./inventory.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Create inventory_items table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS inventory_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    price REAL NOT NULL CHECK (price >= 0),
    category TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }
  console.log('Inventory items table created or already exists');
});

// API Routes
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM inventory_items', (err, results) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Ensure price and quantity are properly formatted as numbers
    const formattedResults = results.map(item => ({
      ...item,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity)
    }));
    
    res.json(formattedResults);
  });
});

app.post('/api/items', (req, res) => {
  const { item_name, quantity, price, category, description } = req.body;
  const query = 'INSERT INTO inventory_items (item_name, quantity, price, category, description) VALUES (?, ?, ?, ?, ?)';
  
  db.run(query, [item_name, quantity, price, category, description], function(err) {
    if (err) {
      console.error('Error adding item:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, ...req.body });
  });
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { item_name, quantity, price, category, description } = req.body;
  const query = 'UPDATE inventory_items SET item_name = ?, quantity = ?, price = ?, category = ?, description = ? WHERE id = ?';
  
  db.run(query, [item_name, quantity, price, category, description, id], (err) => {
    if (err) {
      console.error('Error updating item:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, ...req.body });
  });
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM inventory_items WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting item:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 