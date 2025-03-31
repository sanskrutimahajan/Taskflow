// server/src/routes/tasks.ts
import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { io } from '../server'; // import the io instance

const router = Router();

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in progress' | 'completed';
}

let tasks: Task[] = [];

// POST /tasks - Create a new task
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: status || 'pending'
    };
    tasks.push(newTask);

    // Emit the 'taskUpdated' event to all connected clients
    io.emit('taskUpdated', newTask);

    res.status(201).json(newTask);
  })
);

export default router;
