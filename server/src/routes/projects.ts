// routes/projectsRoutes.ts
import { Request, Response, Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
}

let projects: Project[] = [];

// GET /projects
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    res.json(projects);
  })
);

// GET /projects/:id
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  })
);

// POST /projects
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, description, ownerId } = req.body;
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      ownerId,
    };
    projects.push(newProject);
    res.status(201).json(newProject);
  })
);

// PUT /projects/:id
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }
    projects[index] = { ...projects[index], ...req.body };
    res.json(projects[index]);
  })
);

// DELETE /projects/:id
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }
    projects.splice(index, 1);
    res.json({ message: 'Project deleted' });
  })
);

export default router;
