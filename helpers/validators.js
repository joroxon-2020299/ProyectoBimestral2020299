import { body } from "express-validator"
import { validateFields } from "./validate.error.js"
import { userExistsById, emailExists } from "./db.validators.js"

// Validación para el registro de usuarios
export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(emailExists),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(userExistsById),
    body('password', 'Password must be at least 8 characters long and strong')
        .notEmpty()
        .isStrongPassword()
        .isLength({ min: 8 }),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateFields
]

// Validación para login
export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty').notEmpty().toLowerCase(),
    body('password', 'Password must be at least 8 characters long and strong')
        .notEmpty()
        .isStrongPassword()
        .isLength({ min: 8 }),
    validateFields
]