import { Router } from 'express'
import { registerUser, loginUser } from './user.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

// Rutas públicas (registro y login)
api.post('/register', registerUser)
api.post('/login', loginUser)

// Rutas privadas (solo accesibles si el usuario está autenticado y tiene rol ADMIN)
api.get(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    get
)

api.get(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    getAll
)

export default api