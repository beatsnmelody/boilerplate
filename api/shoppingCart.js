const express = require("express");
const shoppingCartRouter = express.Router();
const {
    createCart,
    createCartItems,
    getCartByUserId,
    getAllCartItems,
    getAllCartItemsByUserId,
    getCartItem,
    updateCart,
    deleteCart
} = require("../db");
const { requireUser } = require("./utils");

shoppingCartRouter.post("/cart", requireUser, async (req, res, next) => {
    const {userId} = req.body;

    try {
        const newCart = await createCart({ userId });
        res.send(newCart);
    } catch (error) {
        next(error);
    }
});

shoppingCartRouter.post("/cartItems", requireUser, async (req, res, next) => {
    const {productId, productPrice, productQuantity, productImage, cartId} = req.body;

    try {
        const newCartItems = await createCartItems({ productId, productPrice, productQuantity, productImage, cartId });
        res.send(newCartItems);
    } catch (error) {
        next(error);
    }
});

shoppingCartRouter.get("/:userId", async (req, res, next) => {
    try {
        const userCart = await getCartByUserId(req.params.userId);
        res.send(userCart);
    } catch (error) {
        next(error);
    }
});

shoppingCartRouter.get("/cartItems", async (req, res, next) => {
    try {
        const allCartItems = await getAllCartItems(req.params.userId);
        res.send(allCartItems);
    } catch (error) {
        next(error);
    }
});

shoppingCartRouter.get("/cartItems", async (req, res, next) => {
    try {
        const cartItem = await getCartItem(req.params.userId);
        res.send(cartItem);
    } catch (error) {
        next(error);
    }
});

shoppingCartRouter.get("/cart/:userId", async (req, res, next) => {
    try {
        const cartItems = await getAllCartItemsByUserId(req.params.userId);
        res.send(cartItems);
    } catch (error) {
        next(error);
    }
});

shoppingCartRouter.patch("/:cartId", requireUser, async (req, res, next) => {
    try {
        const { cartItems } = req.params;
        const currentUser = req.user;
        const currentCart = req.cartId;

        const shoppingCart = await getCartByUserId(cartId);

        if (shoppingCart && currentCart.userId === req.user.id) {
            const updatedCart = await updateCart({
                id: cartId,
                ...req.body,
            });
            res.send(updatedCart);
        } else if (shoppingCart.createdBy !== currentUser.id) {
            res.status(403);
            next({
                error: "Error",
                message: `User ${req.user.username} is not allowed to update this user's cart`,
                name: "Error",
            });
        }
    } catch (error) {
        next(error);
    }
});

shoppingCartRouter.delete("/:cartId", requireUser, async (req, res, next) => {
    try {
        const { cartItems } = req.params;
        const currentUser = req.user;

        const cartToBeDeleted = await getReviewById(reviewId);
        if (cartToBeDeleted && cartToBeDeleted.userId === req.user.id) {
            const shoppingCartDelete = await deleteCart(cartId);
            res.send({ shoppingCartDelete, ...cartItems });
        } else if (cartToBeDeleted.createdBy !== currentUser.id) {
            res.status(403);
            next({
                error: "Error",
                message: `User ${req.user.username} is not allowed to delete this cart`,
                name: "Error",
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = shoppingCartRouter;
