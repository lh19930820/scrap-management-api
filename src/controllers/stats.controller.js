import { getOverviewStatsService } from '../services/stats.service.js';

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
