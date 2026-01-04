require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const searchRoutes = require('./routes/search.routes');
const folderRoutes = require('./routes/folder.routes');
const noteRoutes = require('./routes/note.routes');
const groupRoutes = require('./routes/group.routes');
const sharingRoutes = require('./routes/sharing.routes');
const aiRoutes = require('./routes/ai.routes');
const docsRoutes = require('./routes/docs.routes');
const integrationRoutes = require('./routes/integration.routes');

const app = express();
const PORT = process.env.PORT || 7004;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'GatherNote API v1',
    status: 'running',
    timestamp: new Date().toISOString(),
    documentation: '/api/v1/docs',
    integration: '/api/v1/integration'
  });
});

// PUBLIC ENDPOINTS (NO AUTH REQUIRED)
app.use('/api/v1/docs', docsRoutes);
app.use('/api/v1/integration', integrationRoutes);

// PUBLIC sharing endpoint (access note via share token)
const sharingController = require('./controllers/sharing.controller');
app.get('/api/v1/sharing/:shareToken', sharingController.getNoteByShareToken);

// API Routes (AUTH REQUIRED)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/folders', folderRoutes);
app.use('/api/v1/groups', groupRoutes);
app.use('/api/v1/ai', aiRoutes);

// [FIX] Load Sharing Routes DULUAN agar tidak tertutup oleh Note Routes
app.use('/api/v1/notes', sharingRoutes);
app.use('/api/v1/notes', noteRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`🚀 GatherNote API Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;