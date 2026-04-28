import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../repositories/categoryRepo.js";

export async function getCategories() {
    return getAllCategories();
}

export async function getCategory(id) {
    const category = await getCategoryById(id);
    if (!category) {
        const err = new Error('Category not found');
        err.status = 404;
        throw err;
    }
    return category;
}

export async function addCategory(data) {
    return await createCategory(data);
}

export async function updateCategoryDetails(id, data) {
    const category = await getCategoryById(id);
    if (!category) {
        const err = new Error('Category not found');
        err.status = 404;
        throw err;
    }
    return await updateCategory(id, data);
}

export async function deleteTargetCategory(id) {
    const category = await getCategoryById(id);
    if (!category) {
        const err = new Error('Category not found');
        err.status = 404;
        throw err;
    }
    return await deleteCategory(id);
}
