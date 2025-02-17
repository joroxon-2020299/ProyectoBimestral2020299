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
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories', error: err.message })
    }
}

// Obtener una categoría por su ID
export const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id)

        if (!category) return res.status(404).json({ message: 'Category not found' })

        res.status(200).json(category)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching category', error: err.message })
    }
}

// Actualizar una categoría
export const updateCategory = async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body

    try {
        const category = await Category.findById(id)

        if (!category) return res.status(404).json({ message: 'Category not found' })

        // Actualizar los campos de la categoría
        category.name = name || category.name
        category.description = description || category.description

        await category.save()

        res.status(200).json({ message: 'Category updated successfully', category })
    } catch (err) {
        res.status(500).json({ message: 'Error updating category', error: err.message })
    }
}

// Activar/Desactivar categoría
export const toggleCategoryStatus = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)

        if (!category) return res.status(404).json({ message: 'Category not found' })

        category.active = !category.active // Cambia el estado
        await category.save()

        return res.json({ message: `Category ${category.active ? 'activated' : 'deactivated'} successfully`, category })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Error updating category status' })
    }
}