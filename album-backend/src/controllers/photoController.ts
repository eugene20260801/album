import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { uploadPhoto } from '../utils/cloudinary';

export async function addPhoto(req: Request, res: Response) {
  try {
    const { userId, albumId } = req.body;
    const filePath = req.file?.path;
    if (!filePath) return res.status(400).json({ error: 'File missing' });

    const url = await uploadPhoto(filePath);

    const photo = await prisma.photo.create({
      data: { url, userId, albumId },
    });

    res.json(photo);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
}
