//Configurar el servidor de express (HTTP)
//Modular | + efectiva | trabaja en funciones
// Configuración del servidor Express

'use strict'

import express from 'express' // Servidor HTTP
import morgan from 'morgan' // Logs
import helmet from 'helmet' // Seguridad HTTP
import cors from 'cors' // Control de acceso
import { limiter } from '../middlewares/rate.limit.js' // Límite de solicitudes
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import productRoutes from '../src/product/product.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import invoiceRoutes from '../src/invoice/invoice.routes.js'

const configs = (app) => {
    app.use(express.json()) // Aceptar y enviar datos en JSON
    app.use(express.urlencoded({ extended: false })) // No encriptar la URL
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter) // Aplicar el limitador de solicitudes
}

const routes = (app) => {
    // Prefijos de rutas
    app.use('/v1/auth', authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/product', productRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/invoice', invoiceRoutes)
}

// Inicializar el servidor
export const initServer = async () => {
    const app = express()
    try {
        configs(app) // Aplicar configuraciones
        routes(app) // Configurar rutas
        app.listen(process.env.PORT || 3000) // Usar puerto definido o 3000 por defecto
        console.log(`Server running on port ${process.env.PORT || 3000}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}
