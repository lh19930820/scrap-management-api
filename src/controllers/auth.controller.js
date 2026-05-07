import { loginService, registerService } from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        const user = await registerService(req.body);

        return res.status(201).json({
            message: 'Register successfully',
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const data = await loginService(req.body);

        return res.json({
            message: 'Login successfully',
            ...data
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
