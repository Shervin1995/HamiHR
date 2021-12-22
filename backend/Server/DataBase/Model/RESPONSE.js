const Sequelize = require('sequelize');
const sequelize = require('../Connect'); 
const USER = require("./USER");
const TICKET = require("./TICKET");

// RESPONSE
const RESPONSE = sequelize.define("Response", { 
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  content: {type: Sequelize.JSON},
  seen: {type: Sequelize.ARRAY(Sequelize.INTEGER)}
});
  
// foreignKeys
RESPONSE.belongsTo(TICKET, {foreignKey: "ticketID"})
RESPONSE.belongsTo(USER, {foreignKey: "userID"})


//
module.exports = RESPONSE
  