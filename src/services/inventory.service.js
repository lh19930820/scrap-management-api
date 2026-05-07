import Inventory from '../models/inventory.model.js';

export const updateInventoryService = async (type, items) => {
    for (const item of items) {
        let inventory = await Inventory.findOne({
            productId: item.productId
        });

        if (!inventory) {
            inventory = await Inventory.create({
                productId: item.productId,
                quantity: 0
            });
        }

        // IMPORT
        if (type === 'import') {
            inventory.quantity += item.quantity;
        }

        // EXPORT
        if (type === 'export') {
            if (inventory.quantity < item.quantity) {
                throw new Error('Not enough stock');
            }

            inventory.quantity -= item.quantity;
        }

        await inventory.save();
    }
};

export const getInventoryService = async () => {
    return await Inventory.find().populate('productId', 'name unit defaultPrice').sort({
        updatedAt: -1
    });
};
