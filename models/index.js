const configuracion = require("../config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
 configuracion.database,
 configuracion.user,
 configuracion.password,
  {
    host: configuracion.host,
    dialect: 'mysql'
  }
);

const usersModel = require("./users")(
    sequelize,
    Sequelize.DataTypes
)

sequelize.sync()

module.exports = { usersModel, sequelize }