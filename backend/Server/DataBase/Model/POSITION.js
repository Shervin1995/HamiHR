const Sequelize = require('sequelize');
const sequelize = require('../Connect'); 
const USER = require("./USER");
const LEVELONE = require("./LEVELONE");
const LEVELTWO = require('./LEVELTWO');
const LEVELTHREE = require('./LEVELTHREE');

// POSITION
const POSITION = sequelize.define("Position", { 
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  personalCode: {type: Sequelize.STRING}
},{
  timestamps: false
});
  
// foreignKeys
POSITION.belongsTo(LEVELONE, {foreignKey: "leveloneID"})
POSITION.belongsTo(LEVELTWO, {foreignKey: "leveltwoID"})
POSITION.belongsTo(LEVELTHREE, {foreignKey: "levelthreeID"})
POSITION.belongsTo(USER, {foreignKey: "userID"})


//
module.exports = POSITION
  