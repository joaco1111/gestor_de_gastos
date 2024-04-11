const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('review', {
    id: {
        type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    } 
}, { paranoid: true })
}