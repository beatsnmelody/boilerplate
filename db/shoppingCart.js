const client = require("./client");

async function createCart({userId}) {
    const { rows:[cart] } = await client.query(`
    INSERT INTO cart ("userId")
    VALUES($1)
    RETURNING *;
    `, [userId])
}

async function getAllCarts() {}

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

async function getCartByUserId({userId}) {}

async function updateCart() {}

async function deleteCart() {}

module.exports = {
    createCart,
    getAllCarts,
    getCartById,
    getCartByUserId,
    updateCart,
    deleteCart
}