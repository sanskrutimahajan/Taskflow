// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import messageRoutes from './routes/messages';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

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

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
