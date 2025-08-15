# 🚀 Dream Crafted Motion - Localhost Setup Guide

This guide will help you set up and run both the frontend and backend servers on your localhost.

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git (for version control)

## 🛠️ Quick Setup

### Step 1: Install Frontend Dependencies

```bash
# Navigate to the project root
cd dream-crafted-motion

# Install frontend dependencies
npm install
```

### Step 2: Install Backend Dependencies

```bash
# Navigate to the server directory
cd server

# Install backend dependencies
npm install

# Return to project root
cd ..
```

### Step 3: Set Up Environment Variables

```bash
# Copy the environment template
cp server/env.example server/.env

# Edit the .env file if needed (optional)
# The default settings should work for localhost
```

### Step 4: Run Both Servers

You have several options to run the servers:

#### Option A: Run Both Servers Simultaneously (Recommended)
```bash
# Install concurrently if not already installed
npm install

# Run both frontend and backend servers
npm run dev:full
```

#### Option B: Run Servers Separately
**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

#### Option C: Run Only Frontend (if you don't need backend)
```bash
npm run dev
```

## 🌐 Access Your Application

Once both servers are running, you can access:

- **Frontend (React App):** http://localhost:8080
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/api/health

## 🧪 Testing the Setup

### 1. Test Frontend
Open http://localhost:8080 in your browser. You should see your React application.

### 2. Test Backend
Visit http://localhost:3001/api/health in your browser. You should see:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 3. Test API Endpoints
You can test the API endpoints using the ServerTest component or directly:

- **GET** http://localhost:3001/api/hello
- **POST** http://localhost:3001/api/data (with JSON body)
- **GET** http://localhost:3001/api/users/1

## 📁 Project Structure

```
dream-crafted-motion/
├── src/                    # Frontend React source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   └── ...
├── server/                # Backend Express.js server
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── README.md         # Backend documentation
├── package.json           # Frontend dependencies
├── vite.config.ts         # Vite configuration
└── SETUP_GUIDE.md        # This file
```

## 🔧 Available Scripts

### Frontend Scripts (from project root)
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts (from server directory)
- `npm run dev` - Start backend with auto-restart
- `npm start` - Start backend in production mode

### Combined Scripts (from project root)
- `npm run dev:full` - Run both frontend and backend
- `npm run dev:server` - Run only backend
- `npm run server:install` - Install backend dependencies
- `npm run server:start` - Start backend in production mode

## 🐛 Troubleshooting

### Port Already in Use
If you get a "port already in use" error:

**For Frontend (port 8080):**
```bash
# Find and kill the process using port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**For Backend (port 3001):**
```bash
# Find and kill the process using port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### CORS Issues
If you encounter CORS errors, make sure:
1. Backend server is running on port 3001
2. Frontend is running on port 8080
3. CORS is properly configured in `server/server.js`

### Module Not Found Errors
If you get module not found errors:
```bash
# Reinstall dependencies
npm install
cd server && npm install && cd ..
```

## 🔄 Development Workflow

1. **Start Development:**
   ```bash
   npm run dev:full
   ```

2. **Make Changes:**
   - Edit frontend code in `src/` directory
   - Edit backend code in `server/` directory
   - Both servers will auto-restart on changes

3. **Test Changes:**
   - Frontend changes: http://localhost:8080
   - Backend changes: Test API endpoints

4. **Stop Servers:**
   - Press `Ctrl+C` in the terminal

## 📚 Next Steps

- Check out the `ServerTest` component to test API connectivity
- Add your own API endpoints in `server/server.js`
- Customize the frontend components in `src/components/`
- Set up a database connection if needed
- Configure environment variables for production

## 🆘 Need Help?

- Check the server logs in the terminal
- Review the `server/README.md` for backend documentation
- Test individual endpoints using the ServerTest component
- Ensure all dependencies are properly installed

Happy coding! 🎉
