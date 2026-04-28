import express from 'express';
import { getAllLoansHandler, getLoanByIdHandler, borrowBookHandler, returnBookHandler, removeLoanHandler} from '../controllers/loanController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('admin', 'librarian'), getAllLoansHandler);
router.get('/:id', authenticate, getLoanByIdHandler);
router.post('/borrow', authenticate, borrowBookHandler);
router.post('/:id/return', authenticate, returnBookHandler);
router.delete('/:id', authenticate, authorizeRoles('admin', 'librarian'), removeLoanHandler);

export default router;