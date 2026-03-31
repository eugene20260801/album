import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { uploadPhoto, deletePhotoFromCloudinary } from '../utils/cloudinary';
import fs from 'fs';

// Add a new photo
export async function addPhoto(req: Request, res: Response) {
  try {
    const { userId, albumId } = req.body;
    if (!req.file) return res.status(400).json({ error: 'File missing' });

    // Upload to Cloudinary
    const url = await uploadPhoto(req.file.path);

    // Remove local temp file
    fs.unlinkSync(req.file.path);

    // Save in database
    const photo = await prisma.photo.create({
      data: { url, userId: Number(userId), albumId: Number(albumId) },
    });

    res.json(photo);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}

// Get all photos
export async function getPhotos(req: Request, res: Response) {
  try {
    const photos = await prisma.photo.findMany();
    res.json(photos);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}

// Update photo
export async function updatePhoto(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).json({ error: 'File missing' });

    // Find existing photo
    const existing = await prisma.photo.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return res.status(404).json({ error: 'Photo not found' });

    // Delete old photo from Cloudinary
    await deletePhotoFromCloudinary(existing.url);

    // Upload new photo
    const url = await uploadPhoto(req.file.path);
    fs.unlinkSync(req.file.path);

    // Update DB
    const updated = await prisma.photo.update({
      where: { id: Number(id) },
      data: { url },
    });

    res.json(updated);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}

// Delete photo
export async function deletePhoto(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Find photo
    const existing = await prisma.photo.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return res.status(404).json({ error: 'Photo not found' });

    // Delete from Cloudinary
    await deletePhotoFromCloudinary(existing.url);

    // Delete from DB
    await prisma.photo.delete({ where: { id: Number(id) } });

    res.json({ message: 'Photo deleted' });
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}
