import { getAllUsers, getUserById, updateUserProfile, deleteUserAccount } from "../services/userService.js";

export async function getAllUsersHandler(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getUserByIdHandler(req, res) {
    try {
        const userId = parseInt(req.params.id);
        if (req.user.role !== 'admin' && req.user.id !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateUserProfileHandler(req, res) {
    try {
        const userId = parseInt(req.params.id);
        if (req.user.role !== 'admin' && req.user.id !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const updatedUser = await updateUserProfile(userId, req.body);
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function deleteUserAccountHandler(req, res) {
    try {
        const userId = parseInt(req.params.id);
        await deleteUserAccount(userId);
        return res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}