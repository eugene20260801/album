import express from 'express';
import { addPhoto } from '../controllers/photoController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('file'), addPhoto);

export default router;
