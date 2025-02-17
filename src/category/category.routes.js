import { Router } from 'express'
import { getCategoryById, getAllCategories, createCategory, updateCategory, toggleCategoryStatus } from './category.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

// Obtener todas las categorías
api.get(
    '/', 
    validateJwt, 
    getAllCategories
)

// Obtener una categoría por su ID
api.get(
    '/:id', 
    validateJwt, 
    getCategoryById
)

// Crear una nueva categoría
api.post(
    '/', 
    [
        validateJwt, 
        isAdmin
    ], 
    createCategory
)

// Actualizar una categoría
api.put(
    '/:id', 
    [
        validateJwt, 
        isAdmin
    ], 
    updateCategory
)

// Activar/desactivar categoría
api.put(
    '/:id/status', 
    [
        validateJwt, 
        isAdmin
    ], 
    toggleCategoryStatus
)

export default api