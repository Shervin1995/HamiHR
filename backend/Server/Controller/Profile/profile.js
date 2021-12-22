const {findAll} = require("../../DataBase/Function"); 
const {USER, POSITION} = require("../../DataBase/Model");
const hasUnseen = require("./hasUnseen")

// --------------------------------
// level verified
// --------------------------------
async function profile(req, res) {
    
    const id = req.data.id;
    const positionID = req.data.positionID;

    // basic info
    var user = await USER.findOne({
        where: {id},
        raw: true,
        attributes: ['id', 'shenase', 'firstname', 'lastname', 'mobile', 'sex', 'born', 'createdAt']
    });
      

    // 
    res.json({
        ...user,
        currentPositionID: positionID,
        allPositions: await findAll(POSITION, {userID: id}, false, ["id", "personalCode"]),
        hasUnseen: await hasUnseen(id)
    });

}

//
module.exports = profile