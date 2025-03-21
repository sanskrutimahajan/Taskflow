// routes/messagesRoutes.ts
import { Request, Response, Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

interface Message {
  id: string;
  content: string;
  senderId: string;
  taskId?: string;
  createdAt: Date;
}

let messages: Message[] = [];

// GET /messages
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    res.json(messages);
  })
);

// GET /messages/:id
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const message = messages.find(m => m.id === req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  })
);

// POST /messages
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { content, senderId, taskId } = req.body;
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId,
      taskId,
      createdAt: new Date(),
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  })
);

// PUT /messages/:id
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const index = messages.findIndex(m => m.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Message not found' });
    }
    messages[index] = { ...messages[index], ...req.body };
    res.json(messages[index]);
  })
);

// DELETE /messages/:id
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const index = messages.findIndex(m => m.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Message not found' });
    }
    messages.splice(index, 1);
    res.json({ message: 'Message deleted' });
  })
);

// GET /messages/task/:taskId – messages linked to a specific task
router.get(
  '/task/:taskId',
  asyncHandler(async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskMessages = messages.filter(m => m.taskId === taskId);
    res.json(taskMessages);
  })
);

export default router;
