const { model, Schema } = require('mongoose');

const cartSchema = new Schema({
    name: String,
    description: String,
    image: String,
    imageAlt: String,
    price: String,
    category: String,
    amount: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = model("Cart", cartSchema);