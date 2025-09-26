import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// In-memory storage (in production, you'd use a proper database)
let items = [
  {
    id: '1',
    name: 'Organic Bananas',
    quantity: 6,
    category: 'Fruits',
    notes: 'Make sure they are ripe',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Whole Milk',
    quantity: 1,
    category: 'Dairy',
    notes: '2% or whole milk',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Sourdough Bread',
    quantity: 1,
    category: 'Bakery',
    notes: 'Fresh from the bakery section',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

// Routes
// GET all items
app.get('/api/items', (req, res) => {
  try {
    res.json({ items, success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items', success: false });
  }
});

// POST new item
app.post('/api/items', (req, res) => {
  try {
    const { name, quantity, category, notes } = req.body;
    
    if (!name || !quantity) {
      return res.status(400).json({ 
        error: 'Name and quantity are required', 
        success: false 
      });
    }

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      quantity: parseInt(quantity) || 1,
      category: category?.trim() || 'Other',
      notes: notes?.trim() || '',
      completed: false,
      createdAt: new Date().toISOString()
    };

    items.unshift(newItem);
    res.status(201).json({ item: newItem, success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item', success: false });
  }
});

// PUT update item
app.put('/api/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, category, notes, completed } = req.body;
    
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found', success: false });
    }

    if (!name || !quantity) {
      return res.status(400).json({ 
        error: 'Name and quantity are required', 
        success: false 
      });
    }

    items[itemIndex] = {
      ...items[itemIndex],
      name: name.trim(),
      quantity: parseInt(quantity) || 1,
      category: category?.trim() || 'Other',
      notes: notes?.trim() || '',
      completed: completed || false,
      updatedAt: new Date().toISOString()
    };

    res.json({ item: items[itemIndex], success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item', success: false });
  }
});

// PATCH toggle completion
app.patch('/api/items/:id/toggle', (req, res) => {
  try {
    const { id } = req.params;
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found', success: false });
    }

    items[itemIndex].completed = !items[itemIndex].completed;
    items[itemIndex].updatedAt = new Date().toISOString();

    res.json({ item: items[itemIndex], success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle item', success: false });
  }
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found', success: false });
    }

    const deletedItem = items.splice(itemIndex, 1)[0];
    res.json({ item: deletedItem, success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item', success: false });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🛒 Shopping List Server running on port ${PORT}`);
});