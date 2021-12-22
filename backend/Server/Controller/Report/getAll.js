
const { findAll} = require("../../DataBase/Function");
const { REPORT} = require("../../DataBase/Model");


// --------------------------------
// level verified
// --------------------------------
async function getReports(req, res) {

    var reports = await findAll(REPORT, {userID: req.data.id}, false, ["id", "title", "date"]);
    
    return res.json(reports)

}

//
module.exports = getReports