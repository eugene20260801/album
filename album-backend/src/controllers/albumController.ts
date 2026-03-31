import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Create a new album
export async function createAlbum(req: Request, res: Response) {
  try {
    const { title, description, userId } = req.body || {};
    if (!title || !userId) {
      return res.status(400).json({ error: 'title and userId are required' });
    }

    const album = await prisma.album.create({
      data: {
        title,
        description,
        userId: Number(userId),
      },
    });
    res.json(album);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}

// Get all albums
export async function getAlbums(req: Request, res: Response) {
  try {
    const albums = await prisma.album.findMany({
      include: { photos: true, user: true },
    });
    res.json(albums);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}

// Get a single album by ID
export async function getAlbumById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const album = await prisma.album.findUnique({
      where: { id: Number(id) },
      include: { photos: true, user: true },
    });
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}

// Update an album
export async function updateAlbum(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updated = await prisma.album.update({
      where: { id: Number(id) },
      data: { title, description, updatedAt: new Date() },
    });

    res.json(updated);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}

// Delete an album
export async function deleteAlbum(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Optionally: delete related photos first
    await prisma.photo.deleteMany({ where: { albumId: Number(id) } });

    await prisma.album.delete({ where: { id: Number(id) } });

    res.json({ message: 'Album deleted successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Unknown error' });
  }
}
