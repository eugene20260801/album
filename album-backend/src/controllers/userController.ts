import prisma from '../prismaClient';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Unknown error' });
  }
}

// GET all users
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true }, // exclude password
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Unknown error' });
  }
}
