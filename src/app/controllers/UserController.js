const User = require("../models/User");
module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.status(200).json(users);
  },

  async store(req, res) {
    let admin = false;
    const {
      nome,
      email,
      password,
      password_hash,
      telefone,
      matricula,
      ensino,
      serie,
      curso,
    } = await req.body;

    const isUser =
      (await User.findOne({ where: { matricula } })) ||
      (await User.findOne({ where: { email } }));

    if (isUser) {
      return res.status(422).json({ msg: "Usuário já criado, tente fazer login" });
    } else {
      const user = await User.create({
        nome,
        email,
        password,
        password_hash,
        telefone,
        matricula,
        ensino,
        serie,
        curso,
        admin,
      });
      return res.status(201).json({ msg: "Usuário criado com sucesso" });
    }

  },

  async show(req, res) {
    const { id } = req.body;
    const user = await User.findByPk(id);
    return res.status(200).json(user);
  },
};

// dados.forEach((dado) => {
//   if (!dado || typeof dado === undefined || dado === null) {
//     erros.push("erro");
//   }
// });
