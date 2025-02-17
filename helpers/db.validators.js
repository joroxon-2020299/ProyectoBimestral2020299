import User from '../src/user/user.model.js'
import Category from '../src/category/category.model.js'
import Product from '../src/product/product.model.js'

// Verificar si el email ya está registrado
export const emailExists = async (email = '') => {
    const user = await User.findOne({ email })
    if (user) {
        throw new Error(`The email ${email} is already registered`)
    }
}

// Verificar si el usuario existe por ID
export const userExistsById = async (id = '') => {
    const user = await User.findById(id)
    if (!user) {
        throw new Error(`User with ID ${id} does not exist`)
    }
}

// Verificar si la categoría existe por ID
export const categoryExistsById = async (id = '') => {
    const category = await Category.findById(id)
    if (!category) {
        throw new Error(`Category with ID ${id} does not exist`)
    }
}

// Verificar si el producto existe por ID
export const productExistsById = async (id = '') => {
    const product = await Product.findById(id)
    if (!product) {
        throw new Error(`Product with ID ${id} does not exist`)
    }
}