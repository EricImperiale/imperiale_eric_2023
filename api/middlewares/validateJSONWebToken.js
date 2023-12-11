const jwt = require("jsonwebtoken");

const validateJSONWebToken = async (req, res, next) => {
    const token = req.headers["token"];

    if (!token) {
        return res.status(401).json({ message: "Necesitas iniciar sesión" })
    }

    jwt.verify(token, "SECRET_TOKEN", (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token invalido" })
        }

        req.userId = user.userId
        
        next()
    })
}

module.exports = validateJSONWebToken;