const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function dropTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS cartItems;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS users;
      `);
    console.log("Finished dropping tables!")

    // build tables in correct order
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        productCategory VARCHAR(255) NOT NULL,
        description VARCHAR NOT NULL,
        price INTEGER NOT NULL,
        productImage VARCHAR NOT NULL
      );
      CREATE TABLE cartItems(
        productId INTEGER REFERENCES products(id) NOT NULL,
        productImage VARCHAR REFERENCES products(productImage) NOT NULL,
        cartId INTEGER REFERENCES cart(id) NOT NULL
      );
      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        userId INTEGER REFERENCES users(id) NOT NULL,
        cartItem VARCHAR(255) NOT NULL
      );
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phoneNumber INTEGER NOT NULL,
        isAdmin boolean NOT NULL
      );
      `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error; // we pass the error up to the function that calls createTables
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await buildTables();

  } catch (error) {
    console.log("Error during rebuildDB")
    throw error;
  }
}

rebuildDB()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
