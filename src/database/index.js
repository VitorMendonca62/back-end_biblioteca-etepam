const Sequelize = require("sequelize");
const configDatabase = require("../config/database");

const connection = new Sequelize(configDatabase);

const Book = require("../app/models/Book");
const User = require("../app/models/User");

const models = [Book, User];

connection
  .authenticate()
  .then(() => console.log("Database conectado com sucesso"))
  .catch((err) => console.log("Erro:" + err));

models.forEach((model) => model.init(connection));

module.exports = connection;
