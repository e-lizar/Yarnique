const bcrypt = require("bcrypt.js");

bcrypt.hash("Admin@1234", 10).then(hash => {
  console.log(hash);
});