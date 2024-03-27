const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('collaborations', {
    id: {
        type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transactionId: {
      type: DataTypes.STRING,
    }
}, { timestamps: false })
}