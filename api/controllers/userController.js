const User = require('../models/User');

const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const userValidationSchema = require('../schemas/userSchema');

const registerUser = async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        }

        await userValidationSchema.registerValidationSchema.validate(userData, { abortEarly: false });

        const user = await User.findOne({ email: userData.email });

        if (user) {
            return res.status(400).json({ 
                type: "danger",
                message: "El usuario ya existe." 
            });
        }

        await User.create(userData);

        res.status(201).json({ 
            type: "success",
            message: "Tu cuenta fue creada correctamente. Inicia sesión para continuar."
         });
    } catch (err) {
        res.status(500).json({
            errors: err.errors
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        await userValidationSchema.loginValidationSchema.validate(userData, { abortEarly: false });

        const user = await User.findOne({ email: userData.email });

        if (!user) {
            return res.status(400).json({
                type: "danger", 
                message: "El usuario no existe." 
            });
        }

        const isMatch = await bcrypt.compare(userData.password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                type: "danger", 
                message: "Contraseña incorrecta." 
            });
        }
        
        const token = jsonwebtoken.sign({
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        },
            "SECRET_TOKEN",
            {
                expiresIn: "1h"
            });

        if (token) {
            return res.status(200).json({
                type: "success",
                message: "Bienvenido!",
                userId: user._id,
                token: token
            });
        }

        return res.status(400).json({ message: "Hubo un error al iniciar sesión." });
    } catch (err) {
        return res.status(500).json({
            errors: err.errors
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "")

        res.status(200).json({ message: "Usuario deslogueado correctamente." });
    } catch (err) {
        console.log(err)

        res.status(500).json({ message: "Hubo un error al desloguear el usuario." });
    }

}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password -__v -createdAt -updatedAt");

        if (!user) {
            return res.status(404).json({ message: "El usuario no existe." });
        }

        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            errors: err.errors
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserById
}