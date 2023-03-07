const express = require("express");
const productsRouter = express.Router();
const {
    createProduct,
    getProductById,
    getProductByCategory,
    getAllProducts
} = require("../db");
const { requireUser } = require("./utils");

productsRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts);
    } catch (error) {
        next(error);
    }
});

productsRouter.post("/", requireUser, async (req, res, next) => {
    const { id } = req.user;
    const { productName, productCategory, description, price, productImage} = req.body;

    try {
        const creatorId = id;
        const isAdmin = true;
        const newProduct = await createProduct({ productName, productCategory, description, price, productImage });
        res.send(newProduct);
    } catch (error) {
        next(error);
    }
});