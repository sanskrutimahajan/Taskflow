import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

// In-memory store for messages
interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
}
let messages: Message[] = [];

// GET /messages - List all messages
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    res.json(messages);
  })
);

// GET /messages/:id - Get a specific message by ID
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

// POST /messages - Create a new message
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { content, senderId } = req.body;
    if (!content || !senderId) {
      return res.status(400).json({ message: 'Content and senderId are required' });
    }
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId,
      timestamp: new Date()
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  })
);

// PUT /messages/:id - Update a message
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

// DELETE /messages/:id - Delete a message
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

export default router;
