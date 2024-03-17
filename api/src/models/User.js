const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('user', {
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
    photoProfile:{
      type: DataTypes.STRING,
      defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
 
}, {
  
  //no poner timestamp, porque paranoid necesita esos datos 
  paranoid: true,  //columna borrador logico
})
}




