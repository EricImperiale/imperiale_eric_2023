const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    image: String,
    imageAlt: String,
    price: String,
    category: String,
    inCart: Boolean,
    createdAt: {
        type: Date,
        immutable: true,
    },
    updatedAt: Date
});

module.exports = model("Product", productSchema);