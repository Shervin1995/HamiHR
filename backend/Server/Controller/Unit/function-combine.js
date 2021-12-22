const {findAll} = require("../../DataBase/Function");
const {USER} = require("../../DataBase/Model");

// combineData
async function combine(positions) {

    var ids = positions.map(i => i.userID);
    var uniqIDs = [...new Set(ids)];
    var users = await findAll(USER, {id: uniqIDs}, false, ["id", "shenase", "firstname", "lastname", "sex", "mobile", "born"]);

    //
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

module.exports = combine