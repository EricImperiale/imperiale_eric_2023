const express = require('express'); 

const router = express.Router(); 

const cartController = require('../controllers/cartController');

const validateJSONWebToken = require('../middlewares/validateJSONWebToken');

router.get("/products-cart", cartController.getProductsCart);

router.post("/products-cart", cartController.addProductCart);

router.put("/products-cart/:productId", cartController.putProduct);

router.delete("/products-cart/:productId", cartController.deleteProduct);

router.delete("/products-cart", cartController.emptyCart);

module.exports = router;