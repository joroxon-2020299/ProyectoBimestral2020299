import Invoice from '../invoice.model.js'

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

// Obtener todas las facturas de un usuario
export const getInvoicesByUser = async (req, res) => {
    const { userId } = req.params
    try {
        const invoices = await Invoice.find({ user: userId }).populate('products.product')
        res.status(200).json(invoices)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching invoices', error: err.message })
    }
}