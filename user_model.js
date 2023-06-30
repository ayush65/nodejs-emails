const { readFileSync } = require("fs");

let loadUser = () => {
  let users = JSON.parse(readFileSync("users.json"));
  return users;
};

module.exports = { loadUser };
