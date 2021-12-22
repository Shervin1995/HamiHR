const {POSITION} = require("../../DataBase/Model")
const {findOne} = require("../../DataBase/Function");

// --------------------------------------------------------
// inSameGroup
// --------------------------------------------------------
async function inSameGroup(req, res, next) {

    // 
    var id = req.data.id; 
    var positionID = req.data.positionID; 
    var userPositionID = req.body.userPositionID;  

    //
    var userPosition = await findOne(POSITION, {id: userPositionID})
    var adminPosition = await findOne(POSITION, {id: positionID});
  
    // ------------------------------------------
    // if admin has no position or is at levelthree
    // ------------------------------------------
    if (adminPosition == null || 
        adminPosition.levelthreeID !== null
        ) return res.json({message: "اجازه این کار فقط برای مدیران!"});
    
    // any admin can do with noposition users:
    // 1. update user basic info 
    // 2. delete position (because noposition exists)
    // 3. update position (because noposition exists)
    if (userPositionID == null) return next();
    
    // ------------------------------------------
    // 500-three
    // ------------------------------------------
    if (id == 500 && 
        userPosition.levelthreeID !== null
    ) {
        req.method = { 
            relation: "500-three",
            userPosition: userPosition
        }
        return next();  
    }

    // ------------------------------------------
    // 500-two
    // ------------------------------------------
    if (id == 500 && 
        userPosition.leveltwoID !== null &&
        userPosition.levelthreeID == null) {
        req.method = { 
            relation: "500-two",
            userPosition: userPosition
        }
        return next();  
    }

    // ------------------------------------------
    // 500-one
    // ------------------------------------------
    if (id == 500 && 
        userPosition.leveltwoID == null) {
        req.method = { 
            relation: "500-one",
            userPosition: userPosition
        }
        return next();  
    }  
    
    
    // ------------------------------------------
    // two-three
    // ------------------------------------------
    // if admin is at level two 
    // user at three
    // ------------------------------------------
    if (adminPosition.levelthreeID == null &&
        adminPosition.leveltwoID !== null &&
        userPosition.levelthreeID !== null &&
        userPosition.leveltwoID == adminPosition.leveltwoID
        ){
            req.method = { 
                relation: "two-three",
                userPosition: userPosition
            }
            return next();  
        }

    // ------------------------------------------
    // one-two
    // ------------------------------------------
    // admin at level one
    // user at level two
    // both in same levelone
    // ------------------------------------------
    if (adminPosition.leveltwoID == null &&
        userPosition.levelthreeID == null && 
        userPosition.leveltwoID !== null && 
        adminPosition.leveloneID == userPosition.leveloneID
        ){
            req.method = { 
                relation: "one-two",
                userPosition: userPosition
            }
            return next();  
    }

    // ------------------------------------------
    // one-three
    // ------------------------------------------
    // if admin is at level one
    // user at three
    // same levelone 
    // ------------------------------------------
    if (adminPosition.leveltwoID == null && 
        userPosition.levelthreeID !== null && 
        userPosition.leveloneID == adminPosition.leveloneID
        ) { 
            req.method = { 
                relation: "one-three",
                userPosition: userPosition
            }
            return next();  
    }
     
    //
    return res.json({message: "شما نمیتوانید این کار را انجام دهید!"})

}

// ------------------------------------------
//
module.exports = inSameGroup



