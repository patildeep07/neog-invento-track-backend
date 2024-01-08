const express = require('express');
const cors = require('cors');
const app = express();

const helmet = require('helmet')
app.use(helmet())

const { initializeDatabase } = require("./database/db");

app.use(express.json());
app.use(cors());

initializeDatabase();

// Routes
const inventory = require('./routes/inventory.route')
const sales = require('./routes/sales.route')

app.get('/', (req, res) => {
  res.send('Hello, InventoTrack!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routing

app.use('/api/items', inventory)
app.use('/api/sales', sales)


// Global error

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})