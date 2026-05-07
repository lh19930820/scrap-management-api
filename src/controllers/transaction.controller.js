import Transaction from '../models/transaction.model.js';

import { createTransactionService } from '../services/transaction.service.js';

export const createTransaction = async (req, res) => {
    try {
        const transaction = await createTransactionService(req.body, req.user.id);

        return res.status(201).json({
            message: 'Transaction created successfully',
            data: transaction
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('createdBy', 'name email')
            .populate('items.productId', 'name unit')
            .sort({
                createdAt: -1
            });

        return res.json({
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
