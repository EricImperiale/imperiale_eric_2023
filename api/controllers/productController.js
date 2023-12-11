const Product = require('../models/Product');

const productSchema = require('../schemas/productSchema');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        if (!products) {
            return res.status(404).json({ message: "No se encontraron productos." });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            message: "Hubo un error al obtener los productos."
        });
    }
}

const getProductByName = async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.params.filter });

        if (!product) {
            return res.status(404).json({ message: "El producto no existe." });
        }

        res.status(200).json({ product });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: "Hubo un error al obtener el producto." });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "El producto no existe." });
        }

        res.status(200).json({ product });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: "Hubo un error al obtener el producto." });
    }
}

const createProduct = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            imageAlt: req.body.imageAlt,
            category: req.body.category,
        }

        await productSchema.createProductSchema.validate(productData, { abortEarly: false });

        const product = await Product.findOne({ name: productData.name });

        if (product) {
            return res.status(400).json({ message: "Ya existe un producto con ese nombre." });
        }

        await Product.create(productData);

        res.status(201).json({ product });
    } catch (err) {
        res.status(500).json({
            message: "Hubo un error al crear el producto.",
            error: err.errors
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img: req.body.img,
            imgAlt: req.body.imgAlt,
            category: req.body.category,
        }

        await productSchema.updateProductSchema.validate(productData, { abortEarly: false });

        const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({ message: "El producto no existe." });
        }

        res.status(200).json({ product });
    } catch (err) {
        res.status(500).json({
            message: "Hubo un error al actualizar el producto.",
            error: err.errors
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "El producto no existe." });
        }

        res.status(200).json({ message: "El producto fue eliminado correctamente." });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: "Hubo un error al eliminar el producto." });
    }
}

module.exports = {
    getProducts,
    getProductByName,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}