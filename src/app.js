const express = require("express");
const app = express();
const routes = require("./routes");

const authMiddleware = require("./app/middlewares/auth");

require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require("./database");

app.use(routes);

module.exports = app;
