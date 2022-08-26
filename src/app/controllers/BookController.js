const Book = require("../models/Book");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const books = await Book.findAll();
    return res.status(200).json(books);
  },

  async store(req, res) {
    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(404).json();
    }
    const {
      titulo,
      autor,
      sinopse,
      estrelas,
      quantidade,
      data_entregue,
      vezes_pego = 0,
      proprietario,
      status = "Livre",
    } = await req.body;
    const path = await req.file.filename;
    const dados = [titulo, autor, estrelas, sinopse, status, path];

    const book = await Book.create({
      titulo,
      autor,
      sinopse,
      estrelas,
      status,
      quantidade,
      vezes_pego,
      data_entregue,
      proprietario,
      path,
    });
    return res.status(201).json({ msg: "Livro criado com suceso" });
  },

  async show(req, res) {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    return res.status(200).json(book);
  },

  async delete(req, res) {
    const { id } = req.params;

    Book.destroy({ where: { id } });
    const book = await Book.findByPk(id);
    res.json(book);
  },

  async update(req, res) {
    const { titulo, autor, sinopse, quantidade } = req.body;
    const { id } = req.params;

    const book = await Book.findByPk(id);

    await book.update(
      {
        titulo,
        autor,
        sinopse,
        quantidade,
      },
      { where: { id } }
    );
    res.json(book);
  },
};
