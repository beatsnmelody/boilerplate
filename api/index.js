const apiRouter = require('express').Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db/users");

apiRouter.get('/health', (req, res, next) => {
  try {
    res.send({
      healthy: true,
    });
  } catch (error) {
    next(error);
  }
});

// place your routers here

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// ROUTER: /api/users
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

// ROUTER: /api/products
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

// ROUTER: /api/shoppingCart
const shoppingCartRouter = require("./shoppingCart");
apiRouter.use("/shoppingCart", shoppingCartRouter);

// ROUTER: /api/reviews
const reviewsRouter = require("./reviews");
apiRouter.use("/reviews", reviewsRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    error: error.name,
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
