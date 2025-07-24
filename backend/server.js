const express = require('express');
const cors = require('cors');
const compressRoutes = require('./routes/compress');
const mongoose = require('mongoose');

const app = express();

// Show connection string for debugging (hide password)
const safeUri = (process.env.MONGODB_URI || '').replace(/:\w+@/, ':<password>@');
console.log('Connecting to MongoDB:', safeUri);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// CORS for frontend (must be first middleware)
app.use(cors({
  origin: [
    'https://flixconvert.taliyotechnologies.com',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Parse JSON (not needed for file upload, but safe)
app.use(express.json());

// Mount compress routes
app.use('/api/compress', compressRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
