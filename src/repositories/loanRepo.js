import prisma from '../config/db.js';

// Change implemented, added functionality to remove the password from the user object while fetching loan details, to maintain security.
export async function getAllLoans() {
    return prisma.loan.findMany({
        include: {
            book: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
        },
    });
}

export async function getLoanById(id) {
    return prisma.loan.findUnique({
        where: { id },
        include: {
            book: true,
            user: { 
                select: { 
                    id: true, 
                    name: true, 
                    email: true,
                     role: true 
                },
            },
        },
    });
}

export async function createLoan(data) {
    return prisma.loan.create({
        data,
        include: {
            book: true,
            user: { 
                select: { 
                    id: true, 
                    name: true, 
                    email: true, 
                    role: true 
                }, 
            },
        },
    });
}

export async function updateLoan(id, data) {
    return prisma.loan.update({
        where: { id },
        data,
        include: {
            book: true,
            user: { 
                select: { 
                    id: true, 
                    name: true, 
                    email: true, 
                    role: true 
                }, 
            },
        },
    });
}

export async function deleteLoan(id) {
    return prisma.loan.delete({
        where: { id },
        select: { id: true },
    });
}

