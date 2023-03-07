const {
  client,
  createProduct,
  createUser,
  createReview
  // declare your model imports here
  // for example, User
} = require('./');

async function dropTables() {
  try {
    // drop tables in correct order
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS "cartItems";
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
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
        "productName" VARCHAR(255) NOT NULL,
        "productCategory" VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        "productImage" TEXT NOT NULL
      );
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "phoneNumber" INTEGER NOT NULL,
        "isAdmin" boolean NOT NULL
      );
      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) NOT NULL
      );
      CREATE TABLE cartItems(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id) NOT NULL,
        "productQuantity" INTEGER NOT NULL,
        "productImage" TEXT NOT NULL,
        "cartId" INTEGER REFERENCES cart(id) NOT NULL
      );
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id) NOT NULL,
        "userId" INTEGER REFERENCES users(id)NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        rating INTEGER NOT NULL,
        "isPublic" boolean NOT NULL
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
    const products = await Promise.all(productsToCreate.map(createProduct)); //insert route here
    console.log("Products created:");
    console.log(products);
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
      phoneNumber: 1, 
      isAdmin: false},
      { username: "scenequeen",  
      email: "y2kdreams@gmail.com", 
      password: "Xx_RANDOM_xX", 
      phoneNumber: 1, 
      isAdmin: false},
      { username: "glamgal",  
      email: "ValleyGirl@yahoo.com", 
      password: "glamgal123", 
      phoneNumber: 1, 
      isAdmin: false},
    ];
    const users = await Promise.all(usersToCreate.map(createUser)); //insert route here

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialReviews() {
  console.log("Starting to create reviews...");
  try {
    const reviewsToCreate = [
      {
      productId: 1,
      userId: 1,
      title: "The perfect fit for my cosplay",
      description: "This top hat works very well for my Skullgirls cosplay! Very sturdy and cute.",
      rating: 10/10,
      isPublic: true
      },
      { 
      productId: 2,
      userId: 2,
      title: "Misleading",
      description: "This hat didn't become sentient, so I still don't have a wife :(",
      rating: 0/10,
      isPublic: true
      },
      { 
      productId: 3,
      userId: 3,
      title: "OMG",
      description: "LOVE THESE SHOES!! THE COLOR IS SO VIBRANT",
      rating: 9/10,
      isPublic: true
      },
    ];
    const reviews = await Promise.all(reviewsToCreate.map(createReview)); //insert route here

    console.log("Reviews created:");
    console.log(reviews);
    console.log("Finished creating reviews!");
  } catch (error) {
    console.error("Error creating reviews!");
    throw error;
  }
}

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
