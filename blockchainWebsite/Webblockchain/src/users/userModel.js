"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../../config/databaseConn");
let {Post} = require("../posts/postModel");

// table [extension]
let User = sequelize.define("users", {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  gioitinh: Sequelize.STRING,
  sodienthoai: Sequelize.INTEGER,
  diachi: Sequelize.STRING,
  anh: Sequelize.STRING,
  role: {
    type: Sequelize.ENUM("admin", "customer"),
  },
}, {
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["id"],
    },
  ],
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});
User.hasMany(Post, {
    as: "posts",
    foreignKey: "poster",
  });
module.exports = {
  User,
};