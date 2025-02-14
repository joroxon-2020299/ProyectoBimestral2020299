import Product from './product.model.js'

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body
    try {
        const newProduct = new Product({ name, description, price, category, stock })
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message })
    }
}

// Obtener productos por categoría
export const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params
    try {
        const products = await Product.find({ category: categoryId })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message })
    }
}
