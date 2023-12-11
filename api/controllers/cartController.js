const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getProductsCart = async (req, res) => {
    try {
        const cart = await Cart.find({})

        if (!cart) {
            return res.status(404).json({
                type: "error",
                message: "Tu carrito está vacío."
            });
        }

        return res.status(200).json(cart);
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            type: "error",
            message: "Tu carrito está vació."
        });
    }
};

const addProductCart = async (req, res) => {
    const { name, image, price } = req.body;
    
    const estaEnProducts = await Product.findOne({ name });

    const estaEnElCarrito = await Cart.findOne({ name });

    if (!estaEnProducts) {
        res.status(400).json({
            mensaje: "Este producto no se encuentra en nuestra base de datos",
        });

    } else if (!estaEnElCarrito) {
        const newProductInCart = new Cart({ name, image, price, amount: 1 });

        await Product.findByIdAndUpdate(
            estaEnProducts?._id,
            { inCart: true, name, image, price },
            { new: true }
        )
            .then((product) => {
                newProductInCart.save();
                res.json({
                    mensaje: `El producto fue agregado al carrito`,
                    product,
                });
            })

    } else if (estaEnElCarrito) {
        res.status(400).json({
            mensaje: "Este producto ya se encuentra en el carrito",
        });
    } 
};

const putProduct = async (req, res) => {
    const { productId } = req.params;
    const { query } = req.query;
    const body = req.body;

    const productBuscado = await Cart.findById(productId);

    if (!query) {
        res.status(404).json({ mensaje: "Debes enviar una query" });
    } else if (productBuscado && query === "add") {
        body.amount = body.amount + 1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) => {
            res.json({
                mensaje: `El producto: ${product.name} fue actualizado`,
                product,
            });
        });
    } else if (productBuscado && query === "del") {
        body.amount = body.amount - 1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) =>
            res.json({
                mensaje: `El producto: ${product.name} fue actualizado`,
                product,
            })
        );
    } else {
        res.status(400).json({ mensaje: "Ocurrio un error" });
    }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    const productInCart = await Cart.findById(productId);

    const { name, image, price, _id } = await Product.findOne({
        name: productInCart.name,
    });

    await Cart.findByIdAndDelete(productId);

    await Product.findByIdAndUpdate(
        _id,
        { inCart: false, name, image, price },
        { new: true }
    )
        .then((product) => {
            res.json({
                mensaje: `El producto ${product.name} fue eliminado del carrito`,
            });
        })
};

const emptyCart = async (req, res) => {
    await Cart.deleteMany({}); 
};

module.exports = {
    getProductsCart,
    addProductCart,
    deleteProduct,
    putProduct,
    emptyCart
}