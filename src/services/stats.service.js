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
export const getDailyStatsService = async () => {
    const stats = await Transaction.aggregate([
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt'
                        }
                    },

                    type: '$type'
                },

                total: {
                    $sum: '$grandTotal'
                }
            }
        },

        {
            $group: {
                _id: '$_id.date',

                totalImport: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$_id.type', 'import']
                            },
                            '$total',
                            0
                        ]
                    }
                },

                totalExport: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$_id.type', 'export']
                            },
                            '$total',
                            0
                        ]
                    }
                }
            }
        },

        {
            $sort: {
                _id: 1
            }
        },

        {
            $project: {
                _id: 0,

                date: '$_id',

                totalImport: 1,

                totalExport: 1,

                revenue: {
                    $subtract: ['$totalExport', '$totalImport']
                }
            }
        }
    ]);

    return stats;
};

export const getProductStatsService = async (query) => {
    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const keyword = query.keyword || '';

    const pipeline = [
        {
            $unwind: '$items'
        },

        {
            $group: {
                _id: '$items.productId',

                totalQuantity: {
                    $sum: '$items.quantity'
                },

                totalAmount: {
                    $sum: '$items.total'
                }
            }
        },

        {
            $lookup: {
                from: 'products',

                localField: '_id',

                foreignField: '_id',

                as: 'product'
            }
        },

        {
            $unwind: '$product'
        }
    ];

    // SEARCH
    if (keyword) {
        pipeline.push({
            $match: {
                'product.name': {
                    $regex: keyword,
                    $options: 'i'
                }
            }
        });
    }

    // SORT
    pipeline.push({
        $sort: {
            totalQuantity: -1
        }
    });

    // PAGINATION
    pipeline.push({
        $skip: skip
    });

    pipeline.push({
        $limit: limit
    });

    // FORMAT
    pipeline.push({
        $project: {
            _id: 0,

            productId: '$product._id',

            productName: '$product.name',

            unit: '$product.unit',

            totalQuantity: 1,

            totalAmount: 1
        }
    });

    const data = await Transaction.aggregate(pipeline);

    // TOTAL COUNT
    const totalPipeline = [
        {
            $unwind: '$items'
        },

        {
            $group: {
                _id: '$items.productId'
            }
        },

        {
            $lookup: {
                from: 'products',

                localField: '_id',

                foreignField: '_id',

                as: 'product'
            }
        },

        {
            $unwind: '$product'
        }
    ];

    if (keyword) {
        totalPipeline.push({
            $match: {
                'product.name': {
                    $regex: keyword,
                    $options: 'i'
                }
            }
        });
    }

    const totalResult = await Transaction.aggregate([
        ...totalPipeline,

        {
            $count: 'total'
        }
    ]);

    const total = totalResult[0]?.total || 0;

    return {
        data,

        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};
