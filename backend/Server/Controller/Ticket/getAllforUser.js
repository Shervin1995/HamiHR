const {TICKET} = require("../../DataBase/Model")

// ---------------------------------------
//
// ---------------------------------------
async function getAllForUser(req, res) {
    
    var userID = req.query.userID

    //
    var tickets = await TICKET.findAll({
        where:{userID},
        raw: true,
        order: [["createdAt"]],
        attributes: ["id", "title", "createdAt"]
    }) 
   
    //
    return res.json(tickets)

}

//
module.exports = getAllForUser