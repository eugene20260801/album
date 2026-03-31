import express from 'express';
import userRoutes from './routes/userRoutes';
import albumRoutes from './routes/albumRoutes';
import photoRoutes from './routes/photoRoutes';

const app = express();
const PORT = 4000;

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Middleware to parse URL-encoded bodies (optional)
app.use(express.urlencoded({ extended: true }));

// ✅ Mount routes
app.use('/users', userRoutes);
app.use('/albums', albumRoutes);
app.use('/photos', photoRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
