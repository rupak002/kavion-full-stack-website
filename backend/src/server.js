const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('mongo-sanitize');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const blogsRoutes = require('./routes/blogsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const teamRoutes = require('./routes/teamRoutes');
const usersRoutes = require('./routes/usersRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, _res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = mongoSanitize(req.body);
  }
  next();
});

app.get('/api/v1/health', (_req, res) => {
  res.json({ success: true, message: 'KAVION API online' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/blogs', blogsRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/team', teamRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((error, _req, res, _next) => {
  const message = error.message || 'Internal server error';
  res.status(500).json({ success: false, message });
});

app.listen(PORT, () => {
  console.log(`KAVION backend running on http://localhost:${PORT}`);
});
