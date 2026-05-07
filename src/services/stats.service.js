import Product from '../models/product.model.js';
import Transaction from '../models/transaction.model.js';

export const getOverviewStatsService = async () => {
    // TOTAL PRODUCTS
    const totalProducts = await Product.countDocuments();

    // TOTAL TRANSACTIONS
    const totalTransactions = await Transaction.countDocuments();

    // TOTAL IMPORT
    const importResult = await Transaction.aggregate([
        {
            $match: {
                type: 'import'
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: '$grandTotal'
                }
            }
        }
    ]);

    // TOTAL EXPORT
    const exportResult = await Transaction.aggregate([
        {
            $match: {
                type: 'export'
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: '$grandTotal'
                }
            }
        }
    ]);

    const totalImport = importResult[0]?.total || 0;

    const totalExport = exportResult[0]?.total || 0;

    // REVENUE
    const totalRevenue = totalExport - totalImport;

    return {
        totalProducts,
        totalTransactions,
        totalImport,
        totalExport,
        totalRevenue
    };
};
