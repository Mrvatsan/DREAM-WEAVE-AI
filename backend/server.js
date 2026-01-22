/**
 * DreamWeave AI - Backend Server Entry Point
 * Handles Express configuration, database connection, and route aggregation.
 * 
 * @module server
 */
// External Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Application Middleware
app.use(cors());
app.use(express.json());
// TODO: Implement rate limiting for production

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err)); // Ensure IP whitelist if using Atlas

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dreams', require('./routes/dreams'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
