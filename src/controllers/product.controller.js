import {
    createProductService,
    deleteProductService,
    getProductsService,
    getProductByIdService,
    updateProductService
} from '../services/product.service.js';

export const createProduct = async (req, res) => {
    try {
        const product = await createProductService(req.body);

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
        const products = await getProductsService();

        return res.json({
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await getProductByIdService(req.params.id);

        return res.json({
            data: product
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await updateProductService(req.params.id, req.body);

        return res.json({
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await deleteProductService(req.params.id);

        return res.json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
