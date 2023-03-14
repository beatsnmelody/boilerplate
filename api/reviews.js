const express = require("express");
const reviewsRouter = express.Router();
const {
    createReview,
    getAllReviews,
    getAllReviewsByUser,
    getAllReviewsByProduct,
    getReviewById,
    updateReview,
    deleteReview
} = require("../db");
const { requireUser } = require("./utils");

reviewsRouter.post("/", requireUser, async (req, res, next) => {
    const { productId, userId, title, description, rating,
        isPublic } = req.body;

    try {
        const newReview = await createReview({
            productId, userId, title, description, rating,
            isPublic
        });
        res.send(newReview);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.get("/", async (req, res, next) => {
    try {
        const allReviews = await getAllReviews();
        res.send(allReviews);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.get("/:user", async (req, res, next) => {
    try {
        const reviewByUser = await getAllReviewsByUser(req.params.userId);
        res.send(reviewByUser);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.get("/:product", async (req, res, next) => {
    try {
        const reviewsByProduct = await getAllReviewsByProduct(req.params.productId);
        res.send(reviewsByProduct);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.patch("/:reviewId", requireUser, async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const currentUser = req.user;

        const review = await getReviewById(reviewId);

        if (review && review.userId === req.user.id) {
            const updatedReview = await updateReview({
                id: reviewId,
                ...req.body,
            });
            res.send(updatedReview);
        } else if (review.createdBy !== currentUser.id) {
            res.status(403);
            next({
                error: "Error",
                message: `User ${req.user.username} is not allowed to update Every day`,
                name: "Error",
            });
        }
    } catch (error) {
        next(error);
    }
});

reviewsRouter.delete("/:reviewId", requireUser, async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const currentUser = req.user;

        const review = await getReviewById(reviewId);
        if (review && review.userId === req.user.id) {
            const reviewDelete = await deleteReview(reviewId);
            res.send({ reviewDelete, ...routine });
        } else if (review.createdBy !== currentUser.id) {
            res.status(403);
            next({
                error: "Error",
                message: `User ${req.user.username} is not allowed to delete On even days`,
                name: "Error",
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = reviewsRouter;