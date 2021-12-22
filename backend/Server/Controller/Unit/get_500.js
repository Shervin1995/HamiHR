const {findOne, findAll} = require("../../DataBase/Function");
const {POSITION, USER, LEVELTWO, LEVELONE} = require("../../DataBase/Model");
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
async function get_500() {
    

    // admin
    var admin = await findOne(USER, {id: 500}, false, ["firstname", "lastname", "sex", "mobile", "born", "shenase"])

    // title
    var title = "شرکت حامیکت"

    // ------------------------------
    // list
    // ------------------------------
    var positions = await findAll(POSITION, {leveltwoID: null}, false, ["userID", "leveloneID", "leveltwoID", "levelthreeID", "personalCode", "id"]);
    var oneAdmins = await combine(positions)
    var ones = await findAll(LEVELONE, {});
    
    var list = oneAdmins.map(oneAdmin => {

        var one = ones.find(x => x.id == oneAdmin.leveloneID)
        return {
            admin: oneAdmin,
            title: one.title
        }
    })

    // output
    return {admin, title, list}

}

module.exports = get_500