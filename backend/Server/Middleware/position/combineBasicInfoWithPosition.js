const {findAll, findOne} = require("../../DataBase/Function");
const {POSITION, USER} = require("../../DataBase/Model");


// findAllPosition
async function findAllPosition(filter) {
    return await findAll(POSITION, filter, false, ["id",  "leveloneID", "leveltwoID", "levelthreeID", "personalCode", "userID"]);
}

// reduceIT
function reduceIT(arr) {
    return arr.reduce((cur, item) => { 
        cur.push(item.userID)
        return cur;
    }, []);
}

// findAllUser
async function findAllUser(filter) {
    return await findAll(USER, filter, false, ["id", "shenase", "firstname", "lastname", "mobile", "born", "sex", "createdAt"])
} 

// combineData
function combineData(positions, users) {
    return positions.reduce((cur, item) => {
        var theuser = users.find(x => item.userID == x.id);
        var {id, ...basicinfo} = theuser;
        cur.push({
            ...basicinfo,
            ...item
        })
        return cur;
    }, []);    
}

// createList
async function createList(filter) {
    var positions = await findAllPosition(filter);
    var users = await findAllUser({id: reduceIT(positions)});
    return combineData(positions, users);
}


// -------------------------------------------------------------------
// combine Basic Info With Position
// -------------------------------------------------------------------
async function combineBasicInfoWithPosition(req, res, next) {
    
    //
    var positionID = req.data.positionID;

    // no-position 
    if (positionID == null) {
        return res.json({message: "شما  نمیتوانید لیست را بگیرید!"});
    }

    //
    var position = await findOne(POSITION, {id: positionID})

    // 500
    if (position.userID == 500) { 
        req.list = {
            admin: "500",
            list: await createList({})
        }; 
        return next()
    }

    // one
    if (position.leveltwoID == null) {
        req.list = {
            admin: "one",
            list: await createList({leveloneID: position.leveloneID})
        };
        return next()
    }
    
    // two or three
    if (position.leveltwoID !== null) {
        req.list = {
            admin: "two",
            list: await createList({leveltwoID: position.leveltwoID})
        };
        return next()
    }  
 
}

//
module.exports = combineBasicInfoWithPosition
