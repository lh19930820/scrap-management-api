import {
    getDailyStatsService,
    getOverviewStatsService,
    getProductStatsService
} from '../services/stats.service.js';

export const getOverviewStats = async (req, res) => {
    try {
        const stats = await getOverviewStatsService();

        return res.json({
            data: stats
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
export const getDailyStats = async (req, res) => {
    try {
        const stats = await getDailyStatsService();

        return res.json({
            data: stats
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getProductStats = async (req, res) => {
    try {
        const stats = await getProductStatsService(req.query);

        return res.json(stats);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
