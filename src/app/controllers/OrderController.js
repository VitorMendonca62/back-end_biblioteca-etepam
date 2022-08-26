const Book = require("../models/Book");
const User = require("../models/User");
const jwtDecode = require("jwt-decode");

module.exports = {
  async index(req, res) {
    const book = await Book.findAll();
    const livrosUsados = book.filter((a) => (a.dataValues.status === "Em uso"));
    res.json(livrosUsados);
  },

  async store(req, res) {
    const idBook = req.params.id;
    const authtoken = req.headers.authorization;
    const token = authtoken.split(" ")[1];
    const proprietario = jwtDecode(token);

    const book = await Book.findByPk(idBook);
    book.proprietario = proprietario;
    book.status = "Em uso";
    book.vezes_pego++;
    await book.save();

    res.json(book);
  },
  async show(req, res) {},
};
