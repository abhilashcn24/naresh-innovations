# Dream Crafted Motion - Backend Server

This is a custom Express.js server for the Dream Crafted Motion project.

## Features

- ✅ Express.js server with modern ES modules
- ✅ CORS enabled for frontend communication
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan
- ✅ Environment variable support
- ✅ Health check endpoint
- ✅ Example API routes
- ✅ Error handling middleware
- ✅ Production-ready static file serving

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and customize it:

```bash
cp env.example .env
```

Edit `.env` file with your configuration.

### 3. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
- **GET** `/api/health` - Server health status

### Example Endpoints
- **GET** `/api/hello` - Welcome message
- **POST** `/api/data` - Submit data (requires `name` and `message` in body)
- **GET** `/api/users/:id` - Get user by ID

## Development

### Project Structure
```
server/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── env.example        # Environment variables template
└── README.md         # This file
```

### Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-restart

### Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `ALLOWED_ORIGINS` - CORS allowed origins

## Integration with Frontend

The server is configured to work with your Vite frontend running on port 8080. CORS is enabled to allow communication between:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3001`

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Build your frontend: `npm run build` (from project root)
3. The server will automatically serve static files from the `dist` directory

## Adding New Routes

To add new API routes, edit `server.js` and add them before the error handling middleware:

```javascript
// Example new route
app.get('/api/new-endpoint', (req, res) => {
  res.json({ message: 'New endpoint working!' });
});
```
