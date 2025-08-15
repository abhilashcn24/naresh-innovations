import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:8080', 'http://127.0.0.1:8080'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content response
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    timestamp: new Date().toISOString() 
  });
});

// Example API routes
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Dream Crafted Motion Server!',
    data: {
      project: 'Dream Crafted Motion',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// Example POST endpoint
app.post('/api/data', (req, res) => {
  const { name, message } = req.body;
  
  if (!name || !message) {
    return res.status(400).json({ 
      error: 'Name and message are required' 
    });
  }
  
  res.json({
    success: true,
    data: {
      id: Date.now(),
      name,
      message,
      timestamp: new Date().toISOString()
    }
  });
});

// Example GET endpoint with parameters
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock user data - replace with actual database query
  const mockUser = {
    id: parseInt(id),
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  };
  
  res.json(mockUser);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
