import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router = Router();

// POST /users
router.post('/', createUser);

// GET /users
router.get('/', getUsers);

export default router;
