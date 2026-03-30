import express from 'express';
import prisma from './prismaClient';

const app = express();
const PORT = 4000;

app.get('/', async (_req, res) => {
  try {
    // Create a new user
    const user = await prisma.user.create({
      data: {
        name: 'Eugene',
        email: 'eugene@example.com',
      },
    });
    console.log('Created user:', user);

    // Get all users
    const users = await prisma.user.findMany();
    console.log('All users:', users);

    // Send a response back to the client
    res.json({ message: 'Users fetched successfully', users });
  } catch (error) {
    console.error('Error in main:', error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
