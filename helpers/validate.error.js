import { validationResult } from 'express-validator'

// Middleware para validar los campos enviados en las peticiones
export const validateFields = (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}
