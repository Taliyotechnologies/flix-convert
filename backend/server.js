const express = require('express');
const cors = require('cors');
const compressRoutes = require('./routes/compress');

const app = express();

// CORS for frontend
app.use(cors({
  origin: ['https://flixconvert.taliyotechnologies.com', 'http://localhost:5173'],
  credentials: true
}));

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
