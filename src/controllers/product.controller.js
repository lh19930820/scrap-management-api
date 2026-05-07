import Product from '../models/product.model.js';

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        return res.status(201).json({
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({
            createdAt: -1
        });

        return res.json({
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.json({
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
