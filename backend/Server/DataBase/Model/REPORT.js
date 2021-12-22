const Sequelize = require('sequelize');
const sequelize = require('../Connect'); 
const USER = require("./USER");

// POSITION
const REPORT = sequelize.define("Report", { 
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  date: {type: Sequelize.DATE},
  title: {type: Sequelize.STRING},
  output: {type: Sequelize.JSON}
},{
  timestamps: false
});
  
// foreignKeys
REPORT.belongsTo(USER, {foreignKey: "userID"})


//
module.exports = REPORT
  