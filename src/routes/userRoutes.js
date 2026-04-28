import express from 'express';
import { getAllUsersHandler, getUserByIdHandler, updateUserProfileHandler, deleteUserAccountHandler } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { getUserById } from '../services/userService.js';

const router = express.Router();

//Some of these routes will have different permissions based on which role the logged in user has.

// Admins can view all users, but regular users can only view their own profile
router.get('/', authenticate, authorizeRoles('admin'), getAllUsersHandler);

router.get('/:id', authenticate, getUserByIdHandler);

router.put('/:id', authenticate, updateUserProfileHandler);

// Only admins can delete user accounts
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUserAccountHandler);

export default router;