import { Router } from 'express'
import { createProduct, getProductsByCategory } from './product.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

// Rutas públicas (acceso a productos filtrados por categoría)
api.get('/category/:categoryId', getProductsByCategory)

// Rutas privadas (solo accesibles si el usuario está autenticado y tiene rol ADMIN)
api.post(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    createProduct
)

export default api