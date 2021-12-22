const Sequelize = require('sequelize');
const sequelize = require('../Connect'); 
const MEDIA = require('./MEDIA');
const USER = require("./USER");

// POSITION
const TICKET = sequelize.define("Ticket", { 
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  title: {type: Sequelize.STRING},
  content: {type: Sequelize.JSON}, 
  contacts: {type: Sequelize.ARRAY(Sequelize.INTEGER)},
  seen: {type: Sequelize.ARRAY(Sequelize.INTEGER)},
  media: {type: Sequelize.ARRAY(Sequelize.INTEGER)}
});
  
// foreignKeys
TICKET.belongsTo(USER, {foreignKey: "userID"})


//
module.exports = TICKET
  