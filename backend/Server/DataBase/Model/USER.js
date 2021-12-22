const Sequelize = require('sequelize');
const DataTypes = require('sequelize');
const sequelize = require('../Connect'); 


// ARTICLE
const USER = sequelize.define("User", { 
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  firstname: {type: Sequelize.STRING},
  lastname: {type: Sequelize.STRING},
  sex: {type: Sequelize.STRING},
  born: {type: Sequelize.INTEGER}, 
  shenase: {type: Sequelize.STRING}, 
  mobile: {
    type: Sequelize.STRING, 
    allowNull: false, 
    unique: true
  },
  lastSend: {type: Sequelize.DATE},
  otp: {type: DataTypes.ARRAY(DataTypes.DECIMAL)},
  failedTries: {type: Sequelize.INTEGER},
  lastFailedTry: {type: Sequelize.DATE},
  isSuspended: {type: Sequelize.BOOLEAN},
  lastSuspend: {type: Sequelize.DATE},
  lastSuccessLogin: {type: Sequelize.DATE},
  isMobileVerified: {type: Sequelize.BOOLEAN},
  isArchived: {type: Sequelize.BOOLEAN}
});
 


//
module.exports = USER
  