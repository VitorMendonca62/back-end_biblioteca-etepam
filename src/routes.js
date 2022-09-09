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

routes.post("/auth/login", SessionController.store); // Sistema de login

routes.post("/auth/add-user", UserController.store); // Sistema de cadastro


routes.use(authMiddleware); // Autenticacao

routes.get("/auth/get-users", UserController.index); // Mostrar todos os usuarios

routes.post(
  "/books/add-book",
  upload.single("capaLivro"), // Nome que vem do client
  BookController.store
  ); // Cadastrar livro

  routes.get("/books/get-books", BookController.index); // Mostrar todos os livros
  routes.get("/books/:id", BookController.show); // Mostrar um livro pelo id, como /books/1
  routes.put("/books/:id", BookController.update); // Editar o livro
  routes.delete("/books/:id/delete-books", BookController.delete); // Deletar o livro
  
  routes.post("/books/:id/order", OrderController.store) // Pedir algum livro
  routes.get("/book/orders", OrderController.index) // Mostrar todos as ordens
  // routes.put("/books/:id/order", OrderController.update) // Editar uma ordem
  routes.delete("/books/:id/order", OrderController.delete) // Deletar uma ordem

  
  
module.exports = routes;
