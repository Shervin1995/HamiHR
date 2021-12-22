const {findOne} = require("../../DataBase/Function");
const {POSITION} = require("../../DataBase/Model");
const jwt = require('jsonwebtoken');
const My_SECRET = '7Sta-DeTh-dfS!-0AH`-1U23';


// -------------------------------------------------
// just change token 
// -------------------------------------------------
async function changePanel(req, res) {
    
    var id = req.data.id;
    var newPositionID = req.query.newPositionID
    var positionID = req.data.positionID;

    // same position
    if (positionID == newPositionID) {
        return res.json({message: "هم اکنون در همین پوزیشن هستید!"})
    }

    // isPositionExists
    var isPositionExists = await findOne(POSITION, {id: newPositionID});
    if (isPositionExists == null) {
        return res.json({message: "این پوزیشن وجود ندارد!"})
    }

    // hasPosition
    if (isPositionExists.userID !== id) {
        return res.json({message: "این پوزیشن متعلق به شما نیست!"})
    }
    
    // new token
    var data = {
        id: id,
        positionID: newPositionID
    }

    var token = await jwt.sign(data, My_SECRET, {expiresIn: 60*60*24*1000});
   
    // 
    res.json({
        message: "پنل تغییر کرد!",
        token: token
    })

}

//
module.exports = changePanel