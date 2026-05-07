import express from 'express';

import { auth } from '../middlewares/auth.middleware.js';

import { allowRoles } from '../middlewares/role.middleware.js';

import { getOverviewStats } from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/overview', auth, allowRoles('admin'), getOverviewStats);

export default router;
