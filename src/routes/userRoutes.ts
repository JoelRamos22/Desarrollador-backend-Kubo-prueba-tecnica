import { Router } from 'express';
import { createUser, getUserById, getUsersWithWatchedMovies } from '../controllers/userController';

const router = Router();

// Create a new user
router.post('/create-user', createUser);

// Get users with watched movies
router.get('/with-watched-movies', getUsersWithWatchedMovies);

// Get user by ID with their watched movies
router.get('/watched-movies/:id', getUserById);

export default router;