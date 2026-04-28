import express from 'express';
import { getAllBooksHandler, getBookByIdHandler, addNewBookHandler, updateBookDetailsHandler, deleteTargetBookHandler } from '../controllers/bookController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/',authenticate, getAllBooksHandler);
router.get('/:id',authenticate, getBookByIdHandler);
router.post('/', authenticate, authorizeRoles('admin', 'librarian'), addNewBookHandler);
router.put('/:id', authenticate, authorizeRoles('admin', 'librarian'), updateBookDetailsHandler);
router.delete('/:id', authenticate, authorizeRoles('admin', 'librarian'), deleteTargetBookHandler);

export default router;