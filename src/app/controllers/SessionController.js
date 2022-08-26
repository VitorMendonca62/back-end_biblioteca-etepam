const User = require("../models/User");
const authConfig = require("../../config/auth");
const jwt = require("jsonwebtoken");

module.exports = {
  async store(req, res) {
    const { matricula, senha } = await req.body;
    const isUser = await User.findOne({ where: { matricula } });

    const matriculaOuSenhaIncorreto = () =>
      res.status(422).json({ msg: "Matricula ou senha incorreta" });

    if (!isUser || typeof isUser === undefined || isUser === null) {
      return matriculaOuSenhaIncorreto();
    }

    if (isUser && (await isUser.verificarSenha(senha))) {
      const token = jwt.sign(
        { id: isUser.id, name: isUser.nome, matricula: isUser.matricula },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      );
      req.headers.authorization = token;

      return res.json({
        id: isUser.id,
        matricula,
        nome: isUser.nome,
        admin: isUser.admin,
        auth: true,
        token,
      });
    } else {
      return matriculaOuSenhaIncorreto();
    }
  },
};
