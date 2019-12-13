let Sequelize = require("sequelize");

let sequelize = new Sequelize("User", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;