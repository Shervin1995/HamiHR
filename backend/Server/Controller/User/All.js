const {USER} = require("../../DataBase/Model")
const {findAll} = require("../../DataBase/Function")

// --------------------------------------
// use case: 
// add forms like add position, replace position needs this data
// -------------------------------------------
async function getAllUsers(req, res) {
  
    // 
    if (req.data.positionID == null) {
        return res.json({message: "شما به لیست همه کاربران دسترسی ندارید!"})
    }
 
    //
    var users = await findAll(USER, {
        isArchived: false
    }, false, ["id", "firstname", "lastname"])

    //
    return res.json(users)

}

//
module.exports = getAllUsers