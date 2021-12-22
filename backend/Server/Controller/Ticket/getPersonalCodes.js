
const {findOne} = require("../../DataBase/Function");
const { POSITION, USER} = require("../../DataBase/Model");


// --------------------------------
//
// --------------------------------
async function getPersonalCodes(req, res) {


    var thisUserID = req.data.id; 
    var thisPositionID = req.data.positionID; 
    var thisPosition = await findOne(POSITION, {id: thisPositionID})
    var thisPC = thisPosition.personalCode;
  
    var submembers = req.list.list; 

    submembers = submembers.map(user => {
        return {
            personalCode: user.personalCode,
            fullname: `${user.firstname} ${user.lastname}`
        }
    }) 

    // except himself
    let index = submembers.findIndex(item => item.userID == thisUserID)
    submembers.splice(index, 1)
     
    
    //  
    switch (thisPC.length) {
        case 2: 
 
            var hisAdminUser = await findOne(USER, {id: 500}, false, ["firstname", "lastname"])
            var admin = {
                personalCode: "00",
                fullname: `${hisAdminUser.firstname} ${hisAdminUser.lastname}`
            }
            submembers.push(admin)
            

        break;
        case 4:
             
            var hisAdminPosition = await findOne(POSITION, {personalCode: thisPC.slice(0, 2)}, false, ["userID"])
            var hisAdminUser = await findOne(USER, {id: hisAdminPosition.userID}, false, ["firstname", "lastname"])
            var admin = {
                personalCode: thisPC.slice(0, 2),
                fullname: `${hisAdminUser.firstname} ${hisAdminUser.lastname}`
            }
            submembers.push(admin)

        break; 
    }

    //
    submembers = submembers.reduce((cur, item) => {
        var it = cur.find(i => i.fullname == item.fullname) 
        if (it == null) {
            cur.push(item)
        }
        return cur
    }, []);

    // notify 
    return res.json(submembers); 

}

//
module.exports = getPersonalCodes