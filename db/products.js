const client = require("./client");

async function createProduct({productName, productCategory, description, price, productImage}){
    try {
        const {
          rows: [product],
        } = await client.query(
          `
        INSERT INTO products ("productName", "productCategory", description, price, 
        "productImage")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
          [productName, productCategory, description, price, productImage]
        );
        return product;
      } catch (error) {
        console.log(error);
      }
}

async function getProductById(id){
    try {
        const {
          rows: [product],
        } = await client.query(`
          SELECT *
          FROM products
          WHERE id=${id}
          `);
        if (!product) {
          return null;
        }
        return product;
      } catch (error) {
        console.log(error);
      }
}

async function getProductByCategory(){
    try {
        const products = await getAllProducts();
    
        return products.filter((product) => product.productCategory);
      } catch (error) {
        console.log(error);
      }
}

async function getAllProducts(){
  try {
    const { rows: products } = await client.query(`
    SELECT *
    FROM products;
    `);
    return products;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    createProduct,
    getProductById,
    getProductByCategory,
    getAllProducts,
}