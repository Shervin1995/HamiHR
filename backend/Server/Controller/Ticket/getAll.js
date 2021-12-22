const { Op } = require("sequelize");
const {TICKET, USER, RESPONSE} = require("../../DataBase/Model")
const {findAll} = require("../../DataBase/Function")

// ---------------------------------------
//
// ---------------------------------------
async function getAllTickets(req, res) {
    
    var userid = req.data.id;

    //
    var tickets = await TICKET.findAll({
        where: {
          [Op.or]: [
            { userID: userid },
            { contacts: { [Op.contains]: [userid] } }
          ]
        },
        raw: true,
        order: [["createdAt"]],
        attributes: ["id", "title", "userID", "createdAt", "seen"]
    }) 

    //
    var users = await findAll(USER, {
      id: tickets.map(i => i.userID)
    }, false, ["id", "firstname", "lastname"]);


    //
    var responses = await RESPONSE.findAll({
      where:{
        ticketID: tickets.map(i => i.id),
        userID: {[Op.notIn]: [userid]}, 
        [Op.not]: {seen: {[Op.contains]: [userid]}}
      },
      raw: true,
      attributes: ["id", "ticketID"]
    })

    
    //
    return res.json(tickets.map(ticket => ({
      id: ticket.id,
      user: users.find(i => i.id == ticket.userID),
      date: ticket.createdAt,
      title: ticket.title,
      content: ticket.content,
      seen: ticket.seen.includes(userid) && ticket.userID !== userid ? true : 
      ticket.userID == userid && ticket.seen.length !== 0 ? true : false,
      notSeenResponsesCount: responses.filter(i => i.ticketID == ticket.id).length
    })))

}

//
module.exports = getAllTickets