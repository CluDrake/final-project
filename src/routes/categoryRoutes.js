import express from 'express';
import { getAllCategoriesHandler, getCategoryByIdHandler, createCategoryHandler, modifyCategoryHandler, removeCategoryHandler } from '../controllers/categoryController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, getAllCategoriesHandler);
router.get('/:id', authenticate, getCategoryByIdHandler);
router.post('/', authenticate, authorizeRoles('admin', 'librarian'), createCategoryHandler);
router.put('/:id', authenticate, authorizeRoles('admin', 'librarian'), modifyCategoryHandler);
router.delete('/:id', authenticate, authorizeRoles('admin', 'librarian'), removeCategoryHandler);

export default router;