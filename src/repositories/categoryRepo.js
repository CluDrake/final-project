import prisma from '../config/db.js';

export async function getAllCategories() {
    return prisma.category.findMany();
}

export async function getCategoryById(id) {
    return prisma.category.findUnique({
        where: { id },
    });
}

export async function createCategory(data) {
    try {
        return await prisma.category.create({   
            data,
        });
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Category name already exists');
            err.status = 409;
            throw err;
        }
        throw error;
    }   
}

export async function updateCategory(id, data) {
    try {
        return await prisma.category.update({
            where: { id },
            data,
        });
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Category name already exists');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function deleteCategory(id) {
    return prisma.category.delete({
        where: { id },
    });
}