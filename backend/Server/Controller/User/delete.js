const {findAll, findOne, destroy} = require("../../DataBase/Function");
const {USER, POSITION} = require("../../DataBase/Model")


// -----------------------------------------------
// only no-position users
// -----------------------------------------------
async function deleteUser(req, res) {
 
    // isAdmin
    var positionID = req.data.positionID;
    var position = await findOne(POSITION, {id: positionID})
    if (position.levelthreeID !== null) {
        return res.json({message: "فقط ادمین ها میتوانند حذف کنند!"})   
    } 

    // hasPosition
    var userID = req.body.userID;
    if (userID == 500) {
        return res.json({message: "ادمین قابل حذف نیست!"})
    }
    
    var positions = await findAll(POSITION, {userID})
    if (positions.length !== 0) {
        return res.json({message: "این کاربر پوزیشن دارد! ابتدا تمام پوزیشن هایش را جایگزین کنید یا حذف کنید! سپس کاربر را حذف کنید!"})   
    }

    //delete (isArchived: true)
    try {

        await USER.update({
            isArchived: true
        },{
            where: {id: userID}
        })

        res.json({message: "کاربر حذف شد!"})

    } catch (error) {
        console.log(error);
    } 
 

}

//
module.exports = deleteUser;