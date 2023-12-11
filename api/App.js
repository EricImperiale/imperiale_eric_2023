const express = require('express'); 
const cors = require('cors'); 

const app = express();

const DB = require('./config/Database');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes); 

app.use("/api/users", userRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000")

    DB();
});

module.exports = app; 