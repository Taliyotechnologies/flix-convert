require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://flixconvert.taliyotechnologies.com', 'http://localhost:5173'],
  credentials: true
}));
app.use(helmet());
app.use(express.json({ limit: '16mb' }));
app.use(passport.initialize());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/auth');
const compressRoutes = require('./routes/compress');
const fileRoutes = require('./routes/files');
const contactRoutes = require('./routes/contact');
const convertRoutes = require('./routes/convert');
const historyRoutes = require('./routes/history');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/compress', compressRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/convert', convertRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/admin', adminRoutes);

// Root route for health check or default response
app.get('/', (req, res) => {
  res.send('FlixConvert backend is running!');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 