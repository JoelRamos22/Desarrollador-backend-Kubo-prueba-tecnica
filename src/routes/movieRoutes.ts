import { Router } from 'express';
import { createMovie, getMovies, getNewMovies, markMovieAsWatched } from '../controllers/movieController';

const router = Router();

// Create a new movie
router.post('/', createMovie);

// Get all movies with filtering, pagination and sorting
router.get('/', getMovies);

// Get new movies (less than 3 weeks old)
router.get('/new', getNewMovies);

// Mark a movie as watched by a user
router.post('/mark-watched', markMovieAsWatched);

export default router;