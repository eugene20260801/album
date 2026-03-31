import express from 'express';
import {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from '../controllers/albumController';

const router = express.Router();

// Create a new album
router.post('/', createAlbum);

// Get all albums
router.get('/', getAlbums);

// Get single album by ID
router.get('/:id', getAlbumById);

// Update album
router.put('/:id', updateAlbum);

// Delete album
router.delete('/:id', deleteAlbum);

export default router;
