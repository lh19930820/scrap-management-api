import express from 'express';

import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct
} from '../controllers/product.controller.js';

import { createProductSchema } from '../validators/product.validator.js';

import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get('/', getProducts);

router.post('/', validate(createProductSchema), createProduct);

router.put('/:id', validate(createProductSchema), updateProduct);

router.delete('/:id', deleteProduct);

export default router;
