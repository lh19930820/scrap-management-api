import Product from '../models/product.model.js';

export const createProductService = async (payload) => {
    const existedProduct = await Product.findOne({
        name: payload.name
    });

    if (existedProduct) {
        throw new Error('Product already exists');
    }

    const product = await Product.create({
        name: payload.name,
        unit: payload.unit,
        defaultPrice: payload.defaultPrice
    });

    return product;
};

export const getProductsService = async () => {
    const products = await Product.find().sort({
        createdAt: -1
    });

    return products;
};

export const getProductByIdService = async (id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error('Product not found');
    }

    return product;
};

export const updateProductService = async (id, payload) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error('Product not found');
    }

    product.name = payload.name;
    product.unit = payload.unit;
    product.defaultPrice = payload.defaultPrice;

    await product.save();

    return product;
};

export const deleteProductService = async (id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error('Product not found');
    }

    await product.deleteOne();

    return true;
};
