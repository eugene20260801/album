import express from 'express';
import { createAlbum } from '../controllers/albumController';

const router = express.Router();
router.post('/', createAlbum);

export default router;
