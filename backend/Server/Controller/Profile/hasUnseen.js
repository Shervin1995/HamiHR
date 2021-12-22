const {TICKET, RESPONSE} = require("../../DataBase/Model")
const {Op} = require("sequelize")

// --------------------------------------------
// has New Ticket
// --------------------------------------------
async function hasUnseen(userID) {
    
    //
    var ticketsCount = await TICKET.count({
        where: {
            userID: {[Op.notIn]: [userID]},
            contacts: {[Op.contains]: [userID]},
            [Op.not]: {seen: {[Op.contains]: [userID]}}
        }
    })

    
    var seenTickets = await TICKET.findAll({
        where: {
            [Op.or]: {
                userID: {[Op.in]: [userID]},
                seen: {[Op.contains]: [userID]}
            }
        },
        raw: true,
        attributes: ["id"]
    })

    
    var responsesCount = await RESPONSE.count({
        where: {
            ticketID: {[Op.in]: seenTickets.map(i => i.id)},
            userID: {[Op.notIn]: [userID]},
            [Op.not]: {seen: {[Op.contains]: [userID]}}
        }
    })
 
    return  ticketsCount == 0 && responsesCount == 0 ? false : true

}

//
module.exports = hasUnseen