import { Router } from 'express'
import { createCategory, getCategories } from './category.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

// Rutas públicas (obtener todas las categorías)
api.get('/', getCategories)

// Rutas privadas (solo accesibles si el usuario está autenticado y tiene rol ADMIN)
api.post(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    createCategory
)

export default api