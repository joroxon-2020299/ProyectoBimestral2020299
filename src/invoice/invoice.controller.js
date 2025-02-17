import Invoice from './invoice.model.js'
import Product from '../product/product.model.js' // Asegúrate de que el modelo de Producto esté bien importado

// Crear una factura
export const createInvoice = async (req, res) => {
    const { user, products } = req.body
    try {
        let totalAmount = 0
        for (let item of products) {
            const product = await Product.findById(item.product)
            totalAmount += product.price * item.quantity
        }

        const newInvoice = new Invoice({ user, products, totalAmount })
        await newInvoice.save()

        res.status(201).json(newInvoice)
    } catch (err) {
        res.status(500).json({ message: 'Error creating invoice', error: err.message })
    }
}

// Obtener todas las facturas
export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('products.product') // Asegúrate de que esté poblado correctamente
        res.status(200).json(invoices)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching invoices', error: err.message })
    }
}

// Obtener una factura por su ID
export const getInvoiceById = async (req, res) => {
    const { id } = req.params
    try {
        const invoice = await Invoice.findById(id).populate('products.product')

        if (!invoice) return res.status(404).json({ message: 'Invoice not found' })

        res.status(200).json(invoice)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching invoice', error: err.message })
    }
}

// Actualizar una factura
export const updateInvoice = async (req, res) => {
    const { id } = req.params
    const { user, products } = req.body
    try {
        const invoice = await Invoice.findById(id)

        if (!invoice) return res.status(404).json({ message: 'Invoice not found' })

        // Actualizar los campos de la factura
        if (user) invoice.user = user
        if (products) invoice.products = products

        // Volver a calcular el totalAmount en base a los productos actualizados
        let totalAmount = 0
        for (let item of products) {
            const product = await Product.findById(item.product)
            totalAmount += product.price * item.quantity
        }
        invoice.totalAmount = totalAmount

        await invoice.save()

        res.status(200).json({ message: 'Invoice updated successfully', invoice })
    } catch (err) {
        res.status(500).json({ message: 'Error updating invoice', error: err.message })
    }
}

// Actualizar el estado de una factura
export const updateInvoiceStatus = async (req, res) => {
    const { id } = req.params
    try {
        const invoice = await Invoice.findById(id)

        if (!invoice) return res.status(404).json({ message: 'Invoice not found' })

        invoice.status = invoice.status === 'paid' ? 'unpaid' : 'paid' // Cambiar el estado entre 'paid' y 'unpaid'
        await invoice.save()

        return res.json({ message: `Invoice status updated to ${invoice.status}`, invoice })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Error updating invoice status', error: err.message })
    }
}