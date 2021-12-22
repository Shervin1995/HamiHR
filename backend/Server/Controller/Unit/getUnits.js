const {LEVELONE, LEVELTWO} = require("../../DataBase/Model")
const {findAll} = require("../../DataBase/Function")


// ------------------------------------------
// these functions are called in add-position-form to get unit names
// ------------------------------------------

//getOnes
async function getOnes(req, res) {
    res.json(await findAll(LEVELONE, {}))
}

// getTwos
async function getTwos(req, res) {
    
    var leveloneID = req.query.leveloneID;
    res.json(await findAll(LEVELTWO, {leveloneID}, false, ["id", "title"]))
}

// export 
module.exports = {getOnes, getTwos};