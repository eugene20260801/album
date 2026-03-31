import { Request, Response } from 'express';
import prisma from '../prismaClient';

export async function createAlbum(req: Request, res: Response) {
  try {
    const { title, description, userId } = req.body;
    const album = await prisma.album.create({
      data: { title, description, userId },
    });
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: 'Unknown error' });
  }
}
