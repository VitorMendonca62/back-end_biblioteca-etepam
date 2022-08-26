const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authToken.split(" ")[1];

  try {
    jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        res.status(500).json({ msg: err });
      }
      req.userId = decoded.id;
      req.userNome = decoded.nome;
      return next();
    });
  } catch (error) {
    res.status(401).json({ msg: "Token inválido" });
  }
};
