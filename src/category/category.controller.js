import Category from './category.model.js'

// Crear una nueva categoría
export const createCategory = async (req, res) => {
    const { name, description } = req.body
    try {
        const newCategory = new Category({ name, description })
        await newCategory.save()
        res.status(201).json(newCategory)
    } catch (err) {
        res.status(500).json({ message: 'Error creating category', error: err.message })
    }
}

// Obtener todas las categorías
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories', error: err.message })
    }
}