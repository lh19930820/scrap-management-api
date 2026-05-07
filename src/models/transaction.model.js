import mongoose from 'mongoose';

const transactionItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        total: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        _id: false
    }
);

const transactionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['import', 'export'],
            required: true
        },

        items: {
            type: [transactionItemSchema],
            required: true
        },

        grandTotal: {
            type: Number,
            required: true,
            min: 0
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
