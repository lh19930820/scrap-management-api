import Transaction from '../models/transaction.model.js';

export const createTransactionService = async (payload, userId) => {
    const items = payload.items.map((item) => ({
        ...item,

        total: item.quantity * item.price
    }));

    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

    const transaction = await Transaction.create({
        type: payload.type,
        items,
        grandTotal,
        createdBy: userId
    });

    return transaction;
};
