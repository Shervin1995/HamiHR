const {POSITION} = require("../../DataBase/Model")
const {findOne} = require("../../DataBase/Function");

// --------------------------------------------------------
// createWhichLevel
// --------------------------------------------------------
async function createWhichLevel(req, res, next) {

    // 
    var id = req.data.id; 
    var positionID = req.data.positionID;  
    var adminPosition = await findOne(POSITION, {id: positionID});

    var userPosition = { 
        leveloneID: req.body.leveloneID,
        leveltwoID: req.body.leveltwoID,
    } 
 
  
    // ------------------------------------------
    // if admin has no position or is at levelthree
    // ------------------------------------------
    if (adminPosition == null || 
        adminPosition.levelthreeID !== null
        ) return res.json({message: "اجازه اضافه کردن فقط برای مدیران!"});
    
    // ------------------------------------------
    // 500-one
    // ------------------------------------------
    if (id == 500 && 
        userPosition.leveloneID == null) {
        req.method = { 
            relation: "500-one" 
        }
        return next();  
    }  
    
    
    // ------------------------------------------
    // 500-two
    // ------------------------------------------
    if (id == 500 && 
        userPosition.leveloneID !== null &&
        userPosition.leveltwoID == null
    ) {
        req.method = { 
            relation: "500-two" 
        }
        return next();  
    }

    // ------------------------------------------
    // 500-three
    // ------------------------------------------
    if (id == 500 && 
        userPosition.leveltwoID !== null
    ) {
        req.method = { 
            relation: "500-three" 
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
        userPosition.leveltwoID == null 
    ){
        req.method = { 
            relation: "one-two" 
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
        userPosition.leveltwoID !== null 
    ) { 
        req.method = { 
            relation: "one-three" 
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
        adminPosition.leveltwoID !== null 
    ){
        req.method = { 
            relation: "two-three" 
        }
        return next();  
    }

    //
    return res.json({message: "شما نمیتوانید این کار را انجام دهید!"})

}

// ------------------------------------------
//
module.exports = createWhichLevel



