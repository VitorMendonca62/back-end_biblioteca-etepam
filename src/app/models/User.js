const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        telefone: DataTypes.STRING,
        matricula: DataTypes.STRING,
        ensino: DataTypes.STRING,
        serie: DataTypes.STRING,
        curso: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
      },
      { sequelize }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });
    return this;
  }
   verificarSenha(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
module.exports = User;
