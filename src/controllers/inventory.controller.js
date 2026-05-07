import { getInventoryService } from '../services/inventory.service.js';

export const getInventory = async (req, res) => {
    try {
        const inventories = await getInventoryService();

        return res.json({
            data: inventories
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
