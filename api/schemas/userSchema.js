const yup = require('yup'); 

const registerValidationSchema = yup.object({
    username: yup.string().trim().default("Sin nombre de usuario"),
    email: yup.string().email().trim().lowercase().required(),
    password: yup.string().trim().max(255).required(),
    isAdmin: yup.boolean().default(false),
    createdAt: yup.date().default(() => new Date()),
    updatedAt: yup.date().default(() => new Date())
});

const loginValidationSchema = yup.object({
    email: yup.string().email().trim().lowercase().required(),
    password: yup.string().trim().max(255).required()
});

module.exports = {
    registerValidationSchema,
    loginValidationSchema
}