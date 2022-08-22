const express = require("express");
const Product = require("../models/product");

// create Product

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send(product);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
};

// Get All Products

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
};

// update products --admin

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send(product);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
};

// Delete Product

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
};

//get product details
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
};

//Routes
const router = express.Router();

router.get("/allproduct", getAllProducts);
router.get("/product/:id", getProduct);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
