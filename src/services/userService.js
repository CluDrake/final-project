import {findAllUsers, findUserById, findUserByEmail, updateUser, deleteUser} from '../repositories/userRepo.js';
import bcrypt from 'bcrypt';

export async function getAllUsers() {
    return findAllUsers();
}

export async function getUserById(userId) {
    return await findUserById(userId);
}

export async function getUserByEmail(email) {
    return await findUserByEmail(email);
}

export async function updateUserProfile(userId, data) {
    const user = await findUserById(userId);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    const updatedData = { ...data };

    if (data.email) {
        const existingUser = await findUserByEmail(data.email);
        if (existingUser && existingUser.id !== userId) {
            const err = new Error('Email already in use');
            err.status = 409;
            throw err;
        }
        updatedData.email = data.email;
    }
    

    if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        updatedData.password = hashedPassword;
    }
    return await updateUser(userId, updatedData);
}

export async function deleteUserAccount(userId) {
    const user = await findUserById(userId);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    return await deleteUser(userId);
}