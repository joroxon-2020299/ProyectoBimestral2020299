import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String 
        },
        price: { 
            type: Number, 
            required: true 
        },
        category: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category' 
        },
        stock: { 
            type: Number, 
            default: 0 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product
