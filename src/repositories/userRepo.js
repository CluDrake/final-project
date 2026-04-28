import prisma from '../config/db.js';

// User Repository: Handles database operations related to users
// Functions: createUser, getUserByEmail, getUserById, updateUser, deleteUser
// Code was recycled from an earlier project.
export async function createUser(data) {
    try {
        const user = await prisma.user.create({ data, omit: { password: true } });
        return user;
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Email already in use');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
}

export async function findAllUsers() {
    return prisma.user.findMany({ omit: { password: true } });
}

export async function findUserById(id) {
    return prisma.user.findUnique({ where: { id }, omit: { password: true } });
}

export async function updateUser(id, data) {
    return prisma.user.update({
        where: { id },
        data,
        omit: { password: true },

    });
}

export async function deleteUser(id) {
    return prisma.user.delete({ 
        where: { id }, 
        select: { id: true }
    });
}