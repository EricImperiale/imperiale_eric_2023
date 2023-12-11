const express = require('express'); 

const router = express.Router();

const orderController = require('../controllers/orderController'); 

const validateJSONWebToken = require('../middlewares/validateJSONWebToken');

router.get("/", [validateJSONWebToken], orderController.getOrders);

router.post("/", orderController.createOrder);

module.exports = router;

