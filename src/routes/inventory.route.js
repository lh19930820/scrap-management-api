import express from 'express';

import { auth } from '../middlewares/auth.middleware.js';

import { getInventory } from '../controllers/inventory.controller.js';

const router = express.Router();

router.get('/', auth, getInventory);

export default router;
