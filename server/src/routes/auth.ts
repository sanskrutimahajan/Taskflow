import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../middlewares/asyncHandler';
import { body, validationResult } from 'express-validator';

const router = Router();

interface User {
  id: string;
  username: string;
  password: string;
}

// In-memory user store (for demonstration)
const users: User[] = [];

// Generate JWT token
function generateToken(user: User) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1h' }
  );
}

// Middleware to authenticate JWT as a RequestHandler
export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Send a response and then return nothing (void)
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Failed to authenticate token' });
      return;
    }
    (req as any).user = decoded;
    next();
  });
};

// POST /auth/register with validation middleware
router.post(
  '/register',
  [
    // Validate username and password
    body('username').notEmpty().withMessage('Username is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  asyncHandler(async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, password } = req.body;
    // Check if user already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
    };
    users.push(newUser);
    res.status(201).json({ id: newUser.id, username: newUser.username });
  })
);

// POST /auth/login
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  })
);

// GET /auth/profile
router.get(
  '/profile',
  authenticate, // JWT authentication middleware
  asyncHandler(async (req: Request, res: Response) => {
    const userData = (req as any).user;
    res.json({ user: userData });
  })
);

export default router;
