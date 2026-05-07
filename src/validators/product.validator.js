import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),

    unit: z.enum(['kg', 'item']),

    defaultPrice: z
        .number({
            invalid_type_error: 'Default price must be a number'
        })
        .min(0, 'Price must be greater than or equal to 0')
});
