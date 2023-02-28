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
        productName VARCHAR(255) NOT NULL,
        productCategory VARCHAR(255) NOT NULL,
        description VARCHAR NOT NULL,
        price INTEGER NOT NULL,
        productImage VARCHAR NOT NULL
      );
      CREATE TABLE cartItems(
        productId INTEGER REFERENCES products(id) NOT NULL,
        productQuantity INTEGER NOT NULL,
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
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        productId INTEGER REFERENCES products(id) NOT NULL,
        userId INTEGER REFERENCES users(id)NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR NOT NULL,
        rating INTEGER NOT NULL,
        isPublic boolean NOT NULL
      );
      `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error; // we pass the error up to the function that calls createTables
  }
}

async function createInitialProducts() {
  console.log("Starting to create products...");
  try {
    const productsToCreate = [
      { 
        productName: "Tiny Top Hat",
        productCategory : "Lolita",
        description : "What's better than a regular top hat? A tiny top hat!",
        price: 20,
        productImage: "/assets/tinytophat.avif"
      },
      { 
        productName: "Alien Beanie",
        productCategory : "Decora",
        description : "A beanie imported from many light years away. May be sentient!",
        price: 10,
        productImage: "/assets/alienbeanie.jpg"
      },
      { 
        productName: "Bubblegum Platform Heels",
        productCategory : "Gyaru",
        description : "Platforms as pink as a piece of bubblegum.",
        price: 50,
        productImage: "/assets/pinkplatformheels.webp"
      },
    ];
    const products = await Promise.all(productsToCreate.map()); //insert route here
    console.log("Products created:");
    console.log();
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { username: "loveharajuku",  
      email: "sakurapetals@gmail.com", 
      password: "123456789", 
      phoneNumber: 7262037399, 
      isAdmin: false},
      { username: "scenequeen",  
      email: "y2kdreams@gmail.com", 
      password: "Xx_RANDOM_xX", 
      phoneNumber: 2149270494, 
      isAdmin: false},
      { username: "glamgal",  
      email: "ValleyGirl@yahoo.com", 
      password: "glamgal123", 
      phoneNumber: 9407369237, 
      isAdmin: false},
    ];
    const users = await Promise.all(usersToCreate.map()); //insert route here

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialReviews() {}

async function populateInitialData() {
  try {
    await createInitialProducts();
    await createInitialUsers();
    await createInitialReviews();
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
