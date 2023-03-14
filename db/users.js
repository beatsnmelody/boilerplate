const client = require("./client");

const bcrypt = require("bcrypt");
// database functions

// user functions
async function createUser({ username, email, password, phoneNumber, isAdmin }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (username, email, password, phoneNumber, isAdmin)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
      `,
      [username, email, hashedPassword, phoneNumber, isAdmin]
    );
    user.password = null;
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUser({ username, email, password, phoneNumber, isAdmin }) {
  const user = await getUserByUsername(username, email, phoneNumber, isAdmin);
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);
  user.password = null;
  if (isValid) {
    return user;
  } else {
    return null;
  }
}

async function getAllUsers () {
  const { rows } = await client.query(`
  SELECT id, email, username, password, phoneNumber, isAdmin
  FROM users; 
  `)
  return rows;
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    user.password = null;
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByPhoneNumber(phoneNumber) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE phoneNumber = $1`, [
      phoneNumber,
    ]);
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByAdminStatus(isAdmin) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE isadmin = $1`, [
      isAdmin,
    ]);
    return user;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUserByPhoneNumber,
  getUserByAdminStatus
};