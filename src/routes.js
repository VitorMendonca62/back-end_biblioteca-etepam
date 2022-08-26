const express = require("express");
const path = require("path");
const routes = express.Router();
const authMiddleware = require("./app/middlewares/auth");

// Configurações para upar arquivos
const multer = require("multer");
const multerConfig = require("./config/multer");
const upload = multer(multerConfig);

// Models
const BookController = require("./app/controllers/BookController");
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const OrderController = require("./app/controllers/OrderController");

routes.post("/auth/login", SessionController.store);

routes.post("/auth/add-user", UserController.store);


routes.use(authMiddleware);
routes.get("/auth/get-users", UserController.index);

routes.post(
  "/books/add-book",
  upload.single("capaLivro"),
  BookController.store
  );
  routes.get("/books/get-books", BookController.index);
  routes.get("/books/:id", BookController.show);
  routes.delete("/books/:id/delete-books", BookController.delete);
  
  routes.post("/books/:id/order", OrderController.store)
  routes.get("/book/orders", OrderController.index)
  routes.delete("/books/:id/order", OrderController.delete)
  
  
module.exports = routes;
