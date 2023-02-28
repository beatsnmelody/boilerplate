module.exports = {
  client: require("./client"), // adds key/values from users.js
  ...require("./users"), // adds key/values from users.js
  ...require("./products"), // adds key/values from activites.js
  ...require("./shoppingCart"), // etc
  ...require("./reviews"), // etc
};
