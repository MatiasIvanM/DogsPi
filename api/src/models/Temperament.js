const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true
    },
  },
  {
   timestaps:false,
  }
  )
};