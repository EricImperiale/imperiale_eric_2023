const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        amount: String, 
        image: String,  
        name:  String,
        price: String,
      }
    ],
    total: String,
  });

module.exports = model("Order", orderSchema);
