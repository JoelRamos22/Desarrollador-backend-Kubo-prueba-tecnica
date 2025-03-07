import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/environment';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler } from './utils/errorHandler';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// ✅ Si estamos en un entorno local, iniciamos el servidor normalmente
if (process.env.NODE_ENV !== 'production') {
    const port = config.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// ❌ No uses app.listen() en Vercel
export default app;
