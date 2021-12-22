const {findOne, findAll} = require("../../DataBase/Function")
const {POSITION, USER} = require("../../DataBase/Model")


// -----------------------------------------------------
// find all users with no positions
// (next step: find users with 2 positions)
// -----------------------------------------------------
async function getNoPosition(req, res) {
    
    // isAdmin
    var positionID = req.data.positionID;
    var position = await findOne(POSITION, {id: positionID});
    if (position.levelthreeID !== null) {
        return res.json({message: "فقط ادمین ها میتوانند این را انجام دهند!"})   
    }
 
    // -------------------------------
    // calculate noposition users
    // -------------------------------

    // 1. get ids if users that have position
    var userWithPositionIDs = await POSITION.findAll({
        where: {},
        raw: true,
        attributes: ["userID"]
    });

    // 2. get ids of all users
    var AllUsersIDs = await USER.findAll({
        where: {isArchived: false},
        raw: true,
        attributes: ["id"]
    });

     
    

    // 3. figure out the ids of noposition users  
    var noPositionUserIDs = userWithPositionIDs.reduce((cur, item) => {
        let index = cur.findIndex(item1 => item1.id == item.userID)
        if (index !== -1) {
            cur.splice(index, 1); 
        }
        return cur;
    }, AllUsersIDs);


    // [{id: INTEGER}] => [INTEGER]
    noPositionUserIDs = noPositionUserIDs.reduce((cur, item) => {
        if (item.id !== 500) {
            cur.push(item.id);
        }
        return cur;
    }, []);


    // 4. get noposition users basic info
    var list = await findAll(USER, {id: noPositionUserIDs}, false, ["id", "shenase", "firstname", "lastname", "sex", "born", "mobile", "createdAt"])


    // frontend
    res.json(list)
}

//
module.exports = getNoPosition