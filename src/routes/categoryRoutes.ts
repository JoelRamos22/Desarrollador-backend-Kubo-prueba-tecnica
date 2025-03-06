import { Router } from 'express';
import { getCategories, getCategoryById } from '../controllers/categoryController';

const router = Router();

// Get all categories
router.get('/', getCategories);

// Get category by ID
router.get('/:id', getCategoryById);

export default router;