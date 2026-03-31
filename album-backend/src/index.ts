import express from 'express';
import userRoutes from './routes/userRoutes';
import albumRoutes from './routes/albumRoutes';
import photoRoutes from './routes/photoRoutes';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/albums', albumRoutes);
app.use('/photos', photoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
