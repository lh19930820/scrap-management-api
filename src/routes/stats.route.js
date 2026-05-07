import express from 'express';

import { auth } from '../middlewares/auth.middleware.js';

import { allowRoles } from '../middlewares/role.middleware.js';

import {
    getOverviewStats,
    getDailyStats,
    getProductStats
} from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/overview', auth, allowRoles('admin'), getOverviewStats);
router.get('/daily', auth, allowRoles('admin'), getDailyStats);
router.get('/products', auth, allowRoles('admin'), getProductStats);
export default router;
