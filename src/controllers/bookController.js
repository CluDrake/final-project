import { getAllBooks, getBookById, addNewBook, updateBookDetails, deleteTargetBook } from "../services/bookService.js";

export async function getAllBooksHandler(req, res) {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getBookByIdHandler(req, res) {
    try {
        const bookId = parseInt(req.params.id);
        const book = await getBookById(bookId);
        return res.status(200).json(book);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function addNewBookHandler(req, res) {
    try {
        const newBook = await addNewBook(req.body);
        return res.status(201).json(newBook);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function updateBookDetailsHandler(req, res) {
    try {
        const bookId = parseInt(req.params.id);
        const updatedBook = await updateBookDetails(bookId, req.body);
        return res.status(200).json(updatedBook);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }   
}

export async function deleteTargetBookHandler(req, res) {
    try {
        const bookId = parseInt(req.params.id);
        await deleteTargetBook(bookId);
        return res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }   
}
