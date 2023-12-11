const Order = require("../models/Order"); 

const orderSchema = require("../schemas/orderSchema"); 

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId })

        if (!orders) {
            return res.status(404).json({ message: "No se encontraron órdenes." });
        }

        return res.status(200).json(orders);
    } catch (err) {
        console.log(err.errors)

        return res.status(500).json({ message: "Hubo un error al obtener las órdenes." });
    }
};

const createOrder = async (req, res) => {
    try {
        const data = {
            userId: req.body.user._id,
            products: req.body.cartItems,
            total: req.body.total,
        };

        await Order.create(data);

        if (newOrder) {
            return res.status(201).json({ message: "Orden creada correctamente." });
        } else {
            return res.status(400).json({ message: "Hubo un error al crear la orden." });
        } 
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports = {
    getOrders,
    createOrder
}