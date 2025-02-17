import { Router } from 'express'
import { get, getAll, updateStatus } from './user.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

// Rutas privadas
api.get(
    '/', 
    [
        validateJwt, 
        isAdmin
    ], 
    getAll
)

api.get(
    '/:id', 
    [
        validateJwt, 
        isAdmin
    ], 
    get
)

// Activar/desactivar usuario
api.put(
    '/:id/status', 
    [
        validateJwt, 
        isAdmin
    ], 
    updateStatus
) 

export default api