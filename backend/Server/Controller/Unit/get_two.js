
const {findOne, findAll} = require("../../DataBase/Function");
const {POSITION, USER, LEVELTWO, LEVELONE, LEVELTHREE} = require("../../DataBase/Model");
const combine = require("./function-combine")
// ------------------------------------
// output is an object 
// ------------------------------------
// {
//     admin,
//     title,
//     list: [
//         {
//             admin,
//             title
//         }
//     ]
// }
// ------------------------------------
async function get_two(personalCode) {
    
    // admin
    var position = await findOne(POSITION, {personalCode: personalCode.slice(0,4)}, false, ["userID", "leveloneID", "leveltwoID", "levelthreeID", "personalCode", "id"])
    var user = await findOne(USER, {id: position.userID}, false, ["firstname", "shenase", "lastname", "sex", "mobile", "born"]);
    var admin = {...user, ...position}

    // title
    var two = await findOne(LEVELTWO, {id: position.leveltwoID})
    var title = two.title;

    // list
    var threes = await findAll(LEVELTHREE, {leveltwoID: position.leveltwoID});

    var positions = await findAll(POSITION, {
        leveloneID: position.leveloneID,
        leveltwoID: position.leveltwoID,
        levelthreeID: threes.map(x => x.id)
    });

    var threeAdmins = await combine(positions)
 
    var list = threeAdmins.map(threeAdmin => {

        var three = threes.find(x => x.id == threeAdmin.levelthreeID)
        return {
            admin: threeAdmin,
            title: three.title
        }
    })

    // output
    return {admin, title, list}
    
}

module.exports = get_two