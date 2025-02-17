import { generateJwt } from '../../utils/jwt.js'
import { encrypt, checkPassword } from '../../utils/encrypt.js'
import User from '../user/user.model.js'

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Verificar que no exista un usuario con ese email
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        // Encriptar contraseña
        const hashedPassword = await encrypt(password)

        // Crear nuevo usuario con rol CLIENT por defecto
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'CLIENT'
        })

        await newUser.save()

        return res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Verificar si el usuario existe
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Verificar la contraseña
        const isValidPassword = await checkPassword(user.password, password)
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Generar token JWT
        const token = await generateJwt({
            uid: user._id,
            username: user.username,
            role: user.role
        })

        return res.json({ message: 'Login successful', token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}