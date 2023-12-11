const yup = require('yup'); 

const orderSchema = yup.object({
    userId: yup.string().required(),
    products: yup.array().of(yup.object({
        productId: yup.string().required(),
        quantity: yup.number().required(),
        subTotal: yup.number().required(),
    })).required(),
    total: yup.number().required(),
    status: yup.string().required(),
});

module.exports = orderSchema;