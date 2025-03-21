// src/routes/user.ts
import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";

const router = Router();

// Async handler wrapper to catch errors
//asyncHandler:
//A helper function that wraps an async route handler. It calls the handler and catches any errors, passing them to the next middleware (Express error handling). 
// This sometimes helps resolve type overload issues with Express.
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Create a new user
 * POST /users
 */
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password; // In production, hash the password before saving

    const savedUser = await AppDataSource.manager.save(user);
    return res.status(201).json(savedUser);
  })
);

/**
 * Get all users
 * GET /users
 */
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const users = await AppDataSource.manager.find(User);
    return res.json(users);
  })
);

/**
 * Get a single user by ID
 * GET /users/:id
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = await AppDataSource.manager.findOneBy(User, { id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
);

/**
 * Update a user
 * PUT /users/:id
 */
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { username, email, password } = req.body;

    const user = await AppDataSource.manager.findOneBy(User, { id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.password = password ?? user.password;

    const updatedUser = await AppDataSource.manager.save(user);
    return res.json(updatedUser);
  })
);

/**
 * Delete a user
 * DELETE /users/:id
 */
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const result = await AppDataSource.manager.delete(User, id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted" });
  })
);

export default router;
