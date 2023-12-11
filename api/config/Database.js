const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://127.0.0.1:27017/shoppingCart';

const DB = async () => {
    await mongoose.connect(MONGO_URL)
        .then(() => {
            console.log('Conectado a MongoDB');
        })
        .catch((err) => {
            console.log('Hubo un error al Conectar a MongoDB', err);
        });
}

module.exports = DB;
