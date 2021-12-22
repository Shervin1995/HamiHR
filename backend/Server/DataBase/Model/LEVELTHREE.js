const Sequelize = require('sequelize');
const sequelize = require('../Connect'); 
const LEVELTWO = require("./LEVELTWO")

// LEVELONE
const LEVELTHREE = sequelize.define("LevelThree", { 
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  title: {type: Sequelize.STRING},
  order: {type: Sequelize.INTEGER}
},{
  timestamps: false
});
  
LEVELTHREE.belongsTo(LEVELTWO, {foreignKey: "leveltwoID"})


//
module.exports = LEVELTHREE
  