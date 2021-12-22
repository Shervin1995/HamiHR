const Sequelize = require('sequelize');
const sequelize = require('../Connect'); 
const USER = require("./USER");

// POSITION
const MEDIA = sequelize.define("Media", { 
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  title: {type: Sequelize.STRING},
  link: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  shared: {type: Sequelize.ARRAY(Sequelize.INTEGER)}
});

// foreignKeys
MEDIA.belongsTo(USER, {foreignKey: "creatorID"})


//
module.exports = MEDIA
  