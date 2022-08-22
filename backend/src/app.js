const express = require("express");

const app = express();
app.use(express.json());

//route imports
const productRoutes = require("./controllers/productController");

app.use("/api", productRoutes);

module.exports = app;
