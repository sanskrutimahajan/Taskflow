// server/src/server.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import messageRoutes from './routes/messages';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/messages', messageRoutes);

// Centralized error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' } // Allow all origins for development; restrict in production
});

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('New client connected: ', socket.id);

  // Optionally, handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id);
  });
});

// Export io for use in routes if needed
export { io };

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
