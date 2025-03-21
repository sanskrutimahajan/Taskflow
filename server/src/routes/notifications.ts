// routes/notificationsRoutes.ts
import { Request, Response, Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

interface Notification {
  id: string;
  content: string;
  userId: string;
  read: boolean;
}

let notifications: Notification[] = [];

// GET /notifications
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.query;
    if (userId) {
      const userNotifications = notifications.filter(n => n.userId === userId);
      return res.json(userNotifications);
    }
    res.json(notifications);
  })
);

// POST /notifications
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { content, userId } = req.body;
    const newNotification: Notification = {
      id: Date.now().toString(),
      content,
      userId,
      read: false,
    };
    notifications.push(newNotification);
    res.status(201).json(newNotification);
  })
);

// PUT /notifications/:id/read
router.put(
  '/:id/read',
  asyncHandler(async (req: Request, res: Response) => {
    const index = notifications.findIndex(n => n.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    notifications[index].read = true;
    res.json(notifications[index]);
  })
);

// DELETE /notifications/:id
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const index = notifications.findIndex(n => n.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    notifications.splice(index, 1);
    res.json({ message: 'Notification deleted' });
  })
);

export default router;
