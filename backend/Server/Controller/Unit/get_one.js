
const {findOne, findAll} = require("../../DataBase/Function");
const {POSITION, USER, LEVELTWO, LEVELONE} = require("../../DataBase/Model");
const combine = require("./function-combine");

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
async function get_one(personalCode) {

    // admin
    var position = await findOne(POSITION, {personalCode}, false, ["userID", "leveloneID", "leveltwoID", "levelthreeID", "personalCode", "id"])
    var user = await findOne(USER, {id: position.userID}, false, ["firstname", "lastname", "shenase", "sex", "mobile", "born"]);
    var admin = {...user, ...position}

    // title
    var one = await findOne(LEVELONE, {id: position.leveloneID})
    var title = one.title;

    // list
    var twos = await findAll(LEVELTWO, {leveloneID: position.leveloneID});

    var positions = await findAll(POSITION, {
        leveloneID: position.leveloneID,
        leveltwoID: twos.map(x => x.id),
        levelthreeID: null
    });

    var twoAdmins = await combine(positions)

    
    var list = twoAdmins.map(twoAdmin => {

        var two = twos.find(x => x.id == twoAdmin.leveltwoID)
        return {
            admin: twoAdmin,
            title: two.title
        }
    })

    // output
    return {admin, title, list}
    
}

module.exports = get_one