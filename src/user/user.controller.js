import User from './user.model.js'
import { encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

// Registrar un nuevo usuario
export const get = async (req, res) => {
    const { username, email, password, role } = req.body
    try {
        const hashedPassword = await encrypt(password)
        const newUser = new User({ username, email, password: hashedPassword, role })
        await newUser.save()
        const token = await generateJwt({ uid: newUser._id, username: newUser.username, role: newUser.role })
        res.status(201).json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message })
    }
}

// Login de usuario
export const getAll = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'User not found' })

        const isPasswordValid = await checkPassword(user.password, password)
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' })

        const token = await generateJwt({ uid: user._id, username: user.username, role: user.role })
        res.json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message })
    }
}

// Activar/Desactivar usuario
export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) return res.status(404).json({ message: 'User not found' })

        user.active = !user.active // Cambia el estado
        await user.save()

        return res.json({ message: `User ${user.active ? 'activated' : 'deactivated'} successfully`, user })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Error updating user status' })
    }
}