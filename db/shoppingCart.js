const client = require("./client");

async function createCart({ userId }) {
  try {
    const { rows: [cart] } = await client.query(`
    INSERT INTO cart ("userId")
    VALUES($1)
    RETURNING *;
    `, [userId]);
    return cart;
  } catch (error) {
    console.log(error);
  }
}

async function createCartItems({productId, productPrice, productQuantity, productImage, cartId}) {
  try {
    const { rows: [cartItems] } = await client.query(`
    INSERT INTO cart ("productId", "productPrice", "productQuantity", "productImage", "cartId")
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `, [productId, productPrice, productQuantity, productImage, cartId]);
    return cartItems;
  } catch (error) {
    console.log(error);
  }
}

async function getAllCarts() {
  try {
    const { rows: carts } = await client.query(`
      SELECT c.*, u.username AS "username"
      FROM carts c
      JOIN users u 
      ON u.id = c."userId"
    `);
    return carts
  } catch (error) {
    console.log(error);
  }
}

async function getCartById(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
          SELECT *
          FROM cart
          WHERE id=${id}
          `);
    if (!cart) {
      return null;
    }
    return cart;
  } catch (error) {
    console.log(error);
  }
}

async function getCartByUserId({ userId }) {
  try {
    const cart = await getAllCarts();

    return cart.filter((cart) => cart.userId === userId);
  } catch (error) {
    console.log(error);
  }
}

async function getAllCartItems() {
  try {
    const { rows: cartItems } = await client.query(`
      SELECT ci.*, u.username AS "username"
      FROM cartItems ci
      JOIN users u 
      ON u.id = c."userId"
    `);
    return cartItems;
  } catch (error) {
    console.log(error);
  }
}

async function getAllCartItemsByUserId ({userId}) {
  try {
    const { rows: cartItems } = await client.query(`
      SELECT ci."productId", p as products
      FROM cartItems ci
      JOIN products p 
      ON p.id = ci.${userId}
    `);
    return cartItems;
  } catch (error) {
    console.log(error);
  }
}

async function getCartItem({productId}) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(`
      SELECT *
      FROM cartItems
      WHERE id=${productId}
      `);
    if (!productId) {
      return null;
    }
    return cartItem;
  } catch (error) {
    console.log(error);
  }
}



async function updateCart({cartId, ...fields}) { 
  const setString = Object.keys(fields)
   .map((key, index) => `"${key}"=$${index + 1}`)
   .join(", ");
 // return early if this is called without fields
 if (setString.length === 0) {
   return;
 }
 try {
   const {
     rows: [cartItems],
   } = await client.query(
     `
   UPDATE cartItems
   SET ${setString}
   WHERE cartId=${cartId}
   RETURNING *;
 `,
     Object.values(fields)
   );

   return cartItems;
 } catch (error) {
   console.log(error);
 }
}

async function deleteCart({cartId}) {
  try {
    await client.query(`
    DELETE FROM cartItems
    WHERE cartId=$1;`,
      [cartId]
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createCart,
  createCartItems,
  getAllCarts,
  getCartById,
  getCartByUserId,
  getAllCartItems,
  getAllCartItemsByUserId,
  getCartItem,
  updateCart,
  deleteCart
}