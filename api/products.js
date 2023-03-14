const express = require("express");
const productsRouter = express.Router();
const {
    createProduct,
    getProductById,
    getProductByCategory,
    getAllProducts
} = require("../db");
const { requireAdmin } = require("./utils");

productsRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts);
    } catch (error) {
        next(error);
    }
});

productsRouter.get("/:id", async (req, res, next) => {
    try {
        const productId = await getProductById(req.params.id);
        res.send(productId);
    } catch (error) {
        next(error);
    }
});

productsRouter.get("/:category", async (req, res, next) => {
    try {
        const productCategory = await getProductByCategory(req.params.category);
        res.send(productCategory);
    } catch (error) {
        next(error);
    }
});

productsRouter.post("/", requireAdmin, async (req, res, next) => {
    const { productName, productCategory, description, price, productImage} = req.body;

    try {
        const newProduct = await createProduct({ productName, productCategory, description, price, productImage });
        res.send(newProduct);
    } catch (error) {
        next(error);
    }
});

module.exports = productsRouter;