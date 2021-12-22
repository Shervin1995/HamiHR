const {update} = require("../../DataBase/Function");
const {USER} = require("../../DataBase/Model")

// -------------------------------------------
// update basic info 
// -------------------------------------------
// accourding to the middleware `inSameGroup`, 
// the admin can update user basic info
// if they are both inSameGroup
// or user has no position.
// -------------------------------------------
function updateUser(req,res) {
    
    // user
    var newUserData = req.body.newUserData;
    var {id, ...food} = newUserData;

    // update
    update(USER, food,{
        where: {id}
    });

    // frontend
    res.json({message: "کاربر به روز شد!"});
  
}

//
module.exports = updateUser