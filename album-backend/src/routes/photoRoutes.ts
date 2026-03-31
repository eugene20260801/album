import express from 'express';
import multer from 'multer';
import {
  addPhoto,
  deletePhoto,
  updatePhoto,
  getPhotos,
} from '../controllers/photoController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temp storage

// Create photo
router.post('/', upload.single('file'), addPhoto);

// Get all photos
router.get('/', getPhotos);

// Update photo
router.put('/:id', upload.single('file'), updatePhoto);

// Delete photo
router.delete('/:id', deletePhoto);

export default router;
