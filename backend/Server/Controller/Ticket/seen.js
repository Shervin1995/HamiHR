const {TICKET, RESPONSE} = require("../../DataBase/Model")
const {update} = require("../../DataBase/Function"); 
const {Op} = require("sequelize")
const sequelize = require("sequelize")

// --------------------------------------------
//
// --------------------------------------------
async function SeenTicket(req, res) {
    
    var userid = req.data.id;
    var ticketID = req.body.ticketID;
 
            
    // seen the ticket
    update(TICKET, {
        seen: sequelize.fn('array_append', sequelize.col('seen'), userid)
    },{ 
        where: {
            id: ticketID,
            contacts: {[Op.contains]: [userid]},
            [Op.not]: {seen: {[Op.contains]: [userid]}}
        }
    }) 

    // seen the response
    update(RESPONSE, {
        seen: sequelize.fn('array_append', sequelize.col('seen'), userid)
    },{
        where: {
            ticketID: ticketID,
            [Op.not]: {userID: {[Op.contains]: [userid]}},
            [Op.not]: {seen: {[Op.contains]: [userid]}}
        }
    }) 

    // frontend
    res.json("seen!");

}

//
module.exports = SeenTicket