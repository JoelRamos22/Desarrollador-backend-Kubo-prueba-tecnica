import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { CreateMovieDto, MovieQuery } from '../types';

// Create a new movie
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieData: CreateMovieDto = req.body;
    
    // Convert string date to Date object if needed
    if (typeof movieData.releaseDate === 'string') {
      movieData.releaseDate = new Date(movieData.releaseDate);
    }
    
    const movie = await prisma.movie.create({
      data: movieData,
      include: {
        category: true
      }
    });
    
    res.status(201).json(movie);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Foreign key constraint failed')) {
        res.status(400).json({ error: 'Invalid category ID' });
        return;
      }
    }
    
    res.status(500).json({ error: 'Failed to create movie' });
  }
};

// Get all movies with filtering, pagination and sorting
export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, categoryId, page = '1', limit = '10', sortBy = 'releaseDate', sortOrder = 'desc' } = req.query as unknown as MovieQuery;
    
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    
    // Build where clause
    const where: any = {};
    
    if (title) {
      where.title = {
        contains: title
      };
    }
    
    if (categoryId) {
      where.categoryId = Number(categoryId);
    }
    
    // Get total count for pagination
    const totalMovies = await prisma.movie.count({ where });
    
    // Get movies with pagination
    const movies = await prisma.movie.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        [sortBy as string]: sortOrder
      },
      skip,
      take: limitNumber
    });
    
    res.status(200).json({
      data: movies,
      pagination: {
        total: totalMovies,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalMovies / limitNumber)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// Get new movies (released within the last 3 weeks)
export const getNewMovies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    
    const newMovies = await prisma.movie.findMany({
      where: {
        releaseDate: {
          gte: threeWeeksAgo
        }
      },
      include: {
        category: true
      },
      orderBy: {
        releaseDate: 'desc'
      }
    });
    
    res.status(200).json(newMovies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch new movies' });
  }
};

// Mark a movie as watched by a user
export const markMovieAsWatched = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, movieId } = req.body;
    
    if (!userId || !movieId) {
      res.status(400).json({ error: 'User ID and Movie ID are required' });
      return;
    }
    
    // Check if the user and movie exist
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    const movie = await prisma.movie.findUnique({
      where: { id: Number(movieId) }
    });
    
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    
    // Create or update UserMovie record
    const userMovie = await prisma.userMovie.upsert({
      where: {
        userId_movieId: {
          userId: Number(userId),
          movieId: Number(movieId)
        }
      },
      update: {
        watchedAt: new Date()
      },
      create: {
        userId: Number(userId),
        movieId: Number(movieId),
        watchedAt: new Date()
      }
    });
    
    res.status(200).json(userMovie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark movie as watched' });
  }
};