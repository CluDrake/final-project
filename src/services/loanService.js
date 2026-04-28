import { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan } from "../repositories/loanRepo.js";

import prisma from '../config/db.js';

export async function fetchAllLoans() {
    return getAllLoans();
}

export async function fetchLoanById(id) {
    const loan = await getLoanById(id);
    if (!loan) {
        const err = new Error('Loan not found');
        err.status = 404;
        throw err;
    }
    return loan;
}

export async function borrowBook(userId, bookId) {
    // Check if book exists and is available
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
        const err = new Error('Book not found');
        err.status = 404;
        throw err;
    }
    if (!book.isAvailable) {
        const err = new Error('Book is not available');
        err.status = 400;
        throw err;
    }

    // Create loan and mark book as unavailable
    const loan = await createLoan({ userId, bookId });
    await prisma.book.update({ where: { id: bookId }, data: { isAvailable: false } });

    return loan;
}

export async function returnBook(loanId) {
    const loan = await getLoanById(loanId);
    if (!loan) {
        const err = new Error('Loan not found');
        err.status = 404;
        throw err;
    }
    if (loan.returnDate) {
        const err = new Error('Book has already been returned');
        err.status = 400;
        throw err;
    }

    // Marks book as available first and then updates the Loan with the return date.
    await prisma.book.update({ where: { id: loan.bookId }, data: { isAvailable: true } });
    const updatedLoan = await updateLoan(loanId, { returnDate: new Date() });
    

    return updatedLoan;
}

export async function removeLoan(loanId) {
    const loan = await getLoanById(loanId);
    if (!loan) {
        const err = new Error('Loan not found');
        err.status = 404;
        throw err;
    }

    // If loan is still active, mark book as available
    if (!loan.returnDate) {
        await prisma.book.update({ where: { id: loan.bookId }, data: { isAvailable: true } });
    }

    return deleteLoan(loanId);
}