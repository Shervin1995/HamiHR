const Sequelize = require('sequelize');
const sequelize = require('../Connect'); 

// LEVELONE
const LEVELONE = sequelize.define("LevelOne", { 
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  title: {type: Sequelize.STRING}
},{
  timestamps: false
});
   


//
module.exports = LEVELONE
  