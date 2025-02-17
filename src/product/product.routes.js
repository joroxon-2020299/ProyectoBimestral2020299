import { Router } from 'express'
import { getProductById, getAllProducts, createProduct, updateProduct, toggleProductStatus } from './product.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

// Obtener todos los productos
api.get(
    '/', 
    validateJwt, 
    getAllProducts
)

// Obtener un producto por su ID
api.get(
    '/:id', 
    validateJwt, 
    getProductById
)

// Crear un nuevo producto
api.post(
    '/', 
    [
        validateJwt, 
        isAdmin
    ], 
    createProduct
)

// Actualizar un producto
api.put(
    '/:id', 
    [
        validateJwt, 
        isAdmin
    ], 
    updateProduct
)

// Activar/desactivar producto
api.put(
    '/:id/status', 
    [
        validateJwt, 
        isAdmin
    ], 
    toggleProductStatus
)

export default api
