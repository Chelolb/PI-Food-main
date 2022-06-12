const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      defaultValue: 0, 
      validate : {
        max: 100,
        min: 0
      }
    }, 
    healthScore: {
      type: DataTypes.FLOAT, 
      defaultValue: 0,
      validate: {
        max:100,
        min: 0,
      }
    },
    step: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT
    },
  });
};
