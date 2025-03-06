import { Request, Response } from 'express';
import { prisma } from '../config/database';

// Get all categories
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const categoryId = Number(req.params.id);
  
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });
    
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};