// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'grace-shopper-dev';

const DB_URL =
  process.env.DATABASE_URL || `postgres://grace_shopper_f73z_user:GFSKXuy79I8kOnhfPbBk1hZDvxytaiaS@dpg-cgdpmqqk728lv86k39pg-a.ohio-postgres.render.com/grace_shopper_f73z?ssl=true`;

// github actions client config
if (process.env.CI) {
  client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });
} else {
  // local / heroku client config
  client = new Client(DB_URL);
}

module.exports = client;
