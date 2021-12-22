const jwt = require('jsonwebtoken');
const My_SECRET = '7Sta-DeTh-dfS!-0AH`-1U23';
const {POSITION} = require("../../DataBase/Model");
const {findOne} = require("../../DataBase/Function");

// --------------------------------------------
// generateToken
// --------------------------------------------
const generateToken = async (user) => {

   var firstPosition = await findOne(POSITION, {userID: user.id});

   var data = {
      id: user.id,
      positionID: firstPosition ? firstPosition.id : null
   }

   var token = await jwt.sign(data, My_SECRET, {expiresIn: 60*60*24*1000});
   
   return token;

}
//
module.exports = generateToken 