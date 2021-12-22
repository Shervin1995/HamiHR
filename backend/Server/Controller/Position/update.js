const {POSITION} = require("../../DataBase/Model");
const {update} = require("../../DataBase/Function");

// --------------------------------------------
// change userID 
// --------------------------------------------
function updatePosition(req, res) {
    
    // 
    var userID = req.body.userID;
    var id = req.method.userPosition.id

    //
    update(POSITION, {userID}, {where: {id}});
    
    //
    return res.json({message: ` به روز شد!`})
}

//
module.exports = updatePosition