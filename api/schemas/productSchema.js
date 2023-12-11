const yup = require('yup'); 

const createProductSchema = yup.object({
    name: yup.string().max(50).trim().required(),
    description: yup.string().trim().required(),
    image: yup.string().trim().required(),
    imageAlt: yup.string().trim().required(),
    price: yup.string().required(),
    stock: yup.number().required(),
    category: yup.string().oneOf(["Smartphone"]),
    inCart: yup.boolean().default(false),
    createdAt: yup.date().default(() => new Date()),
    updatedAt: yup.date().default(() => new Date())
});

const updateProductSchema = yup.object({
    name: yup.string().max(50).trim(),
    description: yup.string().trim(),
    image: yup.string().trim(),
    imageAlt: yup.string().trim(),
    price: yup.string(),
    stock: yup.number(),
    category: yup.string().oneOf(["Smartphone"]),
    inCart: yup.boolean(),
    createdAt: yup.date(),
    updatedAt: yup.date().default(() => new Date())
});

module.exports = {
    createProductSchema,
    updateProductSchema
}