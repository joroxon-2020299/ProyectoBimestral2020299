import { Router } from 'express'
import { createInvoice, getInvoicesByUser } from './invoice.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

// Rutas privadas (solo accesibles si el usuario está autenticado)
api.post(
    '/',
    [validateJwt],
    createInvoice
)

api.get(
    '/:userId',
    [validateJwt],
    getInvoicesByUser
)

export default api