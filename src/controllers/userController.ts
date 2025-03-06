import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { CreateUserDto } from '../types';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: CreateUserDto = req.body;
    
    const user = await prisma.user.create({
      data: userData
    });
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        res.status(409).json({ error: 'Username or email already exists' });
        return;
      }
    }
    
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get users with movies they have watched
export const getUsersWithWatchedMovies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        watchedMovies: {
          select: {
            movie: true,
            watchedAt: true
          }
        }
      }
    });
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users with watched movies' });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.id);
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        watchedMovies: {
          select: {
            movie: true,
            watchedAt: true
          }
        }
      }
    });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};