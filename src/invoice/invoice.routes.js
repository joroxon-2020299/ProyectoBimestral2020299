import { Router } from 'express'
import { 
    getInvoiceById, 
    getAllInvoices, 
    createInvoice, 
    updateInvoice, 
    updateInvoiceStatus } from './invoice.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

// Crear una factura
api.post(
    '/', 
    [
        validateJwt, 
        isAdmin
    ], 
    createInvoice
)

// Obtener todas las facturas
api.get(
    '/', 
    validateJwt, 
    getAllInvoices
)

// Obtener una factura por su ID
api.get(
    '/:id', 
    validateJwt, 
    getInvoiceById
)

// Actualizar una factura
api.put(
    '/:id', 
    [
        validateJwt, 
        isAdmin
    ], 
    updateInvoice
)

// Actualizar estado de factura
api.put(
    '/:id/status', 
    [
        validateJwt, 
        isAdmin
    ], 
    updateInvoiceStatus
)

export default api