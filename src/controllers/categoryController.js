import { getCategory, getCategories, addCategory, updateCategoryDetails, deleteTargetCategory } from "../services/categoryService.js";

export async function getAllCategoriesHandler(req, res) {
    try {
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getCategoryByIdHandler(req, res) {
    try {
        const id = parseInt(req.params.id);
        const category = await getCategory(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function createCategoryHandler(req, res) {
    try {
        const category = await addCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function modifyCategoryHandler(req, res) {
    try {
        const id = parseInt(req.params.id);
        const category = await updateCategoryDetails(id, req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function removeCategoryHandler(req, res) {
    try {
        const id = parseInt(req.params.id);
        await deleteTargetCategory(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}
