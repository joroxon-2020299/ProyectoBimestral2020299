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

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message })
    }
}

// Obtener un producto por su ID
export const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ message: 'Product not found' })

        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message })
    }
}

// Actualizar un producto
export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, description, price, category, stock } = req.body

    try {
        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ message: 'Product not found' })

        // Actualizar los campos del producto
        product.name = name || product.name
        product.description = description || product.description
        product.price = price || product.price
        product.category = category || product.category
        product.stock = stock || product.stock

        await product.save()

        res.status(200).json({ message: 'Product updated successfully', product })
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message })
    }
}

// Activar/Desactivar producto
export const toggleProductStatus = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ message: 'Product not found' })

        product.active = !product.active // Cambia el estado
        await product.save()

        return res.json({ message: `Product ${product.active ? 'activated' : 'deactivated'} successfully`, product })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Error updating product status' })
    }
}
