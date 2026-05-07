import { z } from 'zod';

export const createTransactionSchema = z.object({
    type: z.enum(['import', 'export']),

    items: z
        .array(
            z.object({
                productId: z.string(),

                quantity: z.number().positive(),

                price: z.number().min(0)
            })
        )
        .min(1)
});
