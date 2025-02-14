import mongoose from 'mongoose'

const invoiceSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        products: [
            {
                product: { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Product' 
                },
                quantity: { 
                    type: Number, 
                    required: true 
                }
            }
        ],
        totalAmount: { 
            type: Number, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
)

const Invoice = mongoose.model('Invoice', invoiceSchema)

export default Invoice