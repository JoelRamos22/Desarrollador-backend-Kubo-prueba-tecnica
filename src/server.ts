import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/environment';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler } from './utils/errorHandler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app: Application = express();
const port = config.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

// Health check endpoint
app.get('/health', async (_req: Request, res: Response) => {
    const dbCheck = await prisma.$queryRaw`SELECT 1`; // Verifica la conexión a la base de datos
    res.status(200).json({ status: 'OK', message: 'Server is running', dbCheck });
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
