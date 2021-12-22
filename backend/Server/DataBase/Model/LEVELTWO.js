const Sequelize = require('sequelize');
const sequelize = require('../Connect'); 
const LEVELONE = require("./LEVELONE")

// LEVELONE
const LEVELTWO = sequelize.define("LevelTwo", { 
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
  
LEVELTWO.belongsTo(LEVELONE, {foreignKey: "leveloneID"})


//
module.exports = LEVELTWO
  