import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

import { generateToken } from '../utils/jwt.js';

export const registerService = async (payload) => {
    const { name, email, password, role } = payload;

    const existedUser = await User.findOne({
        email
    });

    if (existedUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    return user;
};

export const loginService = async (payload) => {
    const { email, password } = payload;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user);

    return {
        token,

        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};
