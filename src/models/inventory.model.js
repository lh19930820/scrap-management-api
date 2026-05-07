import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            unique: true
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
