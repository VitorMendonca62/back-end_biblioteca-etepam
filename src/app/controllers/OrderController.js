const Book = require("../models/Book");
const User = require("../models/User");
const jwtDecode = require("jwt-decode");

module.exports = {
  async index(req, res) {
    const book = await Book.findAll();
    const livrosUsados = book.filter((a) => a.dataValues.status === "Em uso");
    res.json(livrosUsados);
  },

  async store(req, res) {
    const idBook = req.params.id;
    const authtoken = req.headers.authorization;
    const token = authtoken.split(" ")[1];
    const proprietario = jwtDecode(token);

    const dataHoje = new Date();
    let diaEntregue = dataHoje.getDate() + 16;
    diaEntregue < 10 ? (diaEntregue = `0${diaEntregue}`) : diaEntregue;
    let mesEntregue = dataHoje.getMonth() + 1;
    mesEntregue < 10 ? (mesEntregue = `0${mesEntregue}`) : mesEntregue;
    let anoEntregue = dataHoje.getFullYear();

    if (diaEntregue > 30) {
      diaEntregue = diaEntregue - 30;
      diaEntregue < 10 ? (diaEntregue = `0${diaEntregue}`) : diaEntregue;
      mesEntregue++;
      if (mesEntregue > 12) {
        mesEntregue = 1;
        anoEntregue++;
      }
    }

    const data_entregue = `${diaEntregue}/${mesEntregue}/${anoEntregue}`;
    console.log(data_entregue)
    
    const book = await Book.findByPk(idBook);
    book.proprietario = proprietario;
    book.status = "Em uso";
    book.vezes_pego++;
    book.data_entregue = data_entregue

    await book.save();

    res.json(book);
  },
  async show(req, res) {},

  async delete(req, res) {
    const idBook = req.params.id;

    const book = await Book.findByPk(idBook);
    book.proprietario = null;
    book.status = "Livre";
    await book.save();
    res.json(book);
  },
};
