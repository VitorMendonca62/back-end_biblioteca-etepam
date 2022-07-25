const { Model, DataTypes } = require("sequelize");

class Book extends Model {
  static init(sequelize) {
    super.init({
      titulo: DataTypes.STRING,
      autor: DataTypes.STRING,
      sinopse: DataTypes.STRING,
      estrelas: DataTypes.INTEGER,
      quantidade: DataTypes.INTEGER,
      vezes_pego: DataTypes.INTEGER,
      estado: DataTypes.STRING,
      path: DataTypes.STRING,
      url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `http://localhost:4041/uploads/${this.path}`;
        },
      },
    }, { sequelize })
  }
}

module.exports = Book;
