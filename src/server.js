const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'dev'}`
});

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

// Routes
app.use('/api', require('./routes/pokemonRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('Pokémon Team Manager API is running...');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});