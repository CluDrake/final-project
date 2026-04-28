import { findAllBooks, findBookById, createBook, updateBook, deleteBook } from "../repositories/bookRepo.js";

export async function getAllBooks() {
    return findAllBooks();
}

export async function getBookById(bookId) {
    const book = await findBookById(bookId);
    if (!book) {
        const err = new Error('Book not found');
        err.status = 404;
        throw err;
    }
    return book;
}

export async function addNewBook(data) {
    return await createBook(data);
}

export async function updateBookDetails(bookId, data) {
    const book = await findBookById(bookId);
    if (!book) {
        const err = new Error('Book not found');
        err.status = 404;
        throw err;
    }
    return await updateBook(bookId, data);
}

export async function deleteTargetBook(bookId) {
    const book = await findBookById(bookId);
    if (!book) {
        const err = new Error('Book not found');
        err.status = 404;
        throw err;
    }
    return await deleteBook(bookId);
}
