// const { Op } = require("sequelize");
const {findAll, findOne} = require("../../DataBase/Function");
const {TICKET, RESPONSE, USER, MEDIA} = require("../../DataBase/Model");

// ---------------------------------------
// get one ticket
// get all responses
// ---------------------------------------
async function getSingleTicket(req, res) {
    
    var userid = req.data.id;
    var ticketID = req.params.ticketID

    // --------------------------------------------------------------------------
    // isForYou?
    // --------------------------------------------------------------------------
    var ticket = await TICKET.findOne({
        where: {
            id: ticketID,
            // [Op.or]: [
            //     { userID: userid },
            //     { contacts: { [Op.contains]: [userid] } }
            // ]
        },
        raw: true
    })


    // if (!ticket) {
    //     return res.json({message: "پیدا نشد یا مال شما نیست!"})
    // }

    // --------------------------------------------------------------------------
    // preparing ticket info
    // --------------------------------------------------------------------------
    var sender = await findOne(USER, {id: ticket.userID}, false, ["firstname", "lastname"]);
    var senderFullName = `${sender.firstname} ${sender.lastname}`;

    var contacts = await findAll(USER, {id: ticket.contacts}, false, ["id", "firstname", "lastname"]);
    var medias = await findAll(MEDIA, {id: ticket.media}, false, ["id", "title"]);

    var singleTicket = {
        fullname: senderFullName,
        date: ticket.createdAt,
        contacts: contacts,
        content: ticket.content,
        title: ticket.title,
        seen: ticket.seen,
        medias: medias
    }

    // --------------------------------------------------------------------------
    // preparing related responses
    // --------------------------------------------------------------------------
    var responses = await findAll(RESPONSE, {ticketID});
    var responders = await findAll(USER, {id: responses.map(i => i.userID)}, false, ["id", "firstname", "lastname"])

    var newResponses = responses.map(response => ({
            responder: responders.find(responder => response.userID == responder.id),
            date: response.createdAt,
            content: response.content,
            id: response.id
        })
    ) 

    // front end
    return res.json({
        ticket: singleTicket,
        responses: newResponses
    })

}

//
module.exports = getSingleTicket