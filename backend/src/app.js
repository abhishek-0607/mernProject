const express = require("express");

const app = express();
app.use(express.json());

//route imports
const productRoutes = require("./controllers/productController");
const userRoutes = require("./controllers/authController");

app.use("/api", productRoutes);
app.use("/api", userRoutes);
module.exports = app;
