const {REPORT} = require("../../DataBase/Model")
const {findAll} = require("../../DataBase/Function")


async function getUserReports(req, res) {
    
    var userID = req.query.userID;
    var reports = await findAll(REPORT, {userID}, false, ["id", "title", "date"]) 

    res.json(reports)
}

//
module.exports = getUserReports