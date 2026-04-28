import prisma from '../config/db.js';

export async function findAllBooks() {
    return prisma.book.findMany({
        include: { category: true },
    });
}

export async function findBookById(id) {
    return prisma.book.findUnique({
        where: { id },
        include: { category: true },
    });
}

export async function createBook(data) {
    try {
        return await prisma.book.create({
            data,
            include: { category: true },
        });
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('ISBN already exists');
            err.status = 409;
            throw err;
        }
        if (error.code === 'P2003') {
            const err = new Error('Category not found');
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function updateBook(id, data) {
    try {
        return await prisma.book.update({
            where: { id },
            data,
            include: { category: true },
        });
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('ISBN already exists');
            err.status = 409;
            throw err;
        }
        if (error.code === 'P2003') {
            const err = new Error('Category not found');
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function deleteBook(id) {
    return prisma.book.delete({
        where: { id },
        select: { id: true },
    });
}
