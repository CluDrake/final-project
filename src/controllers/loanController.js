import { fetchAllLoans, fetchLoanById, borrowBook, returnBook, removeLoan } from '../services/loanService.js';

export async function getAllLoansHandler(req, res) {
    try {
        const loans = await fetchAllLoans();
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getLoanByIdHandler(req, res) {
    try {
        const id = parseInt(req.params.id);
        const loan = await fetchLoanById(id);

        // added this to check ownership, since members should only see their own loans
        if (req.user.role !== 'admin' && req.user.id !== loan.userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        res.status(200).json(loan);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function borrowBookHandler(req, res) {
    try {
        const userId = req.user.id;
        const bookId = parseInt(req.body.bookId);
        const loan = await borrowBook(userId, bookId);
        res.status(201).json(loan);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function returnBookHandler(req, res) {
    try {
        const loanId = parseInt(req.params.id);
        const loan = await fetchLoanById(loanId);

        // Check ownership or admin
        if (req.user.role !== 'admin' && req.user.id !== loan.userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const updatedLoan = await returnBook(loanId);
        res.status(200).json(updatedLoan);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function removeLoanHandler(req, res) {
    try {
        const loanId = parseInt(req.params.id);
        await removeLoan(loanId);
        res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}