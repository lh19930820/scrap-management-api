import express from 'express';

import { createTransaction, getTransactions } from '../controllers/transaction.controller.js';

import { validate } from '../middlewares/validate.middleware.js';

import { auth } from '../middlewares/auth.middleware.js';

import { createTransactionSchema } from '../validators/transaction.validator.js';

const router = express.Router();

router.get('/', auth, getTransactions);

router.post('/', auth, validate(createTransactionSchema), createTransaction);

export default router;
