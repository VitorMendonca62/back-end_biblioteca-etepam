const Book = require("../models/Book");

module.exports = {
  async index(req, res) {
    const books = await Book.findAll();
    return res.status(200).json(books);
  },

  async store(req, res) {
    const {
      titulo,
      autor,
      sinopse,
      estrelas,
      estado = "Livre",
    } = await req.body;
    const path = await req.file.filename;
    const dados = [titulo, autor, estrelas, sinopse, estado /*path*/];

    const book = await Book.create({
      titulo,
      autor,
      sinopse,
      estrelas,
      estado,
      path,
    });
    return res.status(201).json({ msg: "Livro criado com suceso" });
  },

  async show(req, res) {
    const { id } = req.body;
    const book = await Book.findByPk(id);
    return res.status(200).json(book);
  },
};

// dados.forEach((dado) => {
//   if (!dado || typeof dado === undefined || dado === null) {
//     erros.push("erro");
//   }
// });
