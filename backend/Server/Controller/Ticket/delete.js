const {destroy} = require("../../DataBase/Function")
const {RESPONSE} = require("../../DataBase/Model")

// --------------------------------
// for developing usage
// --------------------------------
function DeleteResponse(req, res) {
    
    var id = req.body.responseID;
    var ramz = req.body.ramz;

    if (ramz !== "I'm a developer! Let me Delete!") {
        return res.json({message: "شما نمیتوانید حذف کنید!"})
    }
    var mes = destroy(RESPONSE, {id});
    res.json({message: "حذف شد!"})
}

//
module.exports = DeleteResponse