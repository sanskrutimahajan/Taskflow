// src/routes/tasks.ts
import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in progress' | 'completed';
  projectId?: string; // optional link to a project
}

let tasks: Task[] = []; // In-memory task store

// GET /tasks - List all tasks
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    res.json(tasks);
  })
);

// GET /tasks/:id - Get a task by id
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  })
);

// POST /tasks - Create a new task
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { title, projectId } = req.body;
    if (!title) return res.status(400).json({ message: 'Task title is required' });
    const newTask: Task = { id: Date.now().toString(), title, status: 'pending', projectId };
    tasks.push(newTask);
    res.status(201).json(newTask);
  })
);

// PUT /tasks/:id - Update a task
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  })
);

// DELETE /tasks/:id - Delete a task
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
  })
);

export default router;
