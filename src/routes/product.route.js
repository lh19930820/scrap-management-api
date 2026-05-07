import express from 'express';

import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductById,
    updateProduct
} from '../controllers/product.controller.js';

import { createProductSchema } from '../validators/product.validator.js';

import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', validate(createProductSchema), createProduct);

router.put('/:id', validate(createProductSchema), updateProduct);

router.delete('/:id', deleteProduct);

export default router;
