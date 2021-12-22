const {Op} = require("sequelize")
const { create, findOne, findAll} = require("../../DataBase/Function");
const {TICKET, RESPONSE, POSITION} = require("../../DataBase/Model");


// --------------------------------
//
// --------------------------------
async function AddResponse(req, res) {

  
    //
    var 
    content = req.body.content,
    ticketID = req.body.ticketID,
    userID = req.data.id,
    positionID = req.data.positionID

    if (
        content == null ||
        ticketID == null 
    ) {
        return res.json({message: "اطلاعات مورد نیاز ارسال نشده است!"})
    }

    // is ticket for you
    var ticket = await TICKET.findOne({
        where: {
            id: ticketID,
            [Op.or]: [
                {userID: userID},
                {contacts: {[Op.contains]: [userID]}}
            ]
        }
    })

    if (!ticket) {
        return res.json({message: "این تیکت یا وجود ندارد یا متعلق به شما نیست!"})
    }

    // -----------------------
    // is level ok
    // -----------------------
    // 1. this 500 is ok
    // 2. this one is ok  
    // 3. this two not to another one (including 500)
    // 4. this three just to his admin
    // 5. this no-position not allowed
    // -----------------------
    if (positionID == null) {
        return res.json({message: "شما دیگر پوزیشن ندارید!"})
    }

    var position = await findOne(POSITION, {id: positionID});
 
    // this is three
    if (position.personalCode.length == 6 && userID !== 500) {
         
        //find his admin
        let adminPosition = await findOne(POSITION, {personalCode: position.personalCode.slice(0,4)})
        
        // check if ticket is written by his admin 
        if(ticket.userID !== adminPosition.userID){
            return res.json({message: "فقط پیام هایی که از مدیر داخلی تان به شما ارسال شود قابل پاسخ دادن است."})
        }

    } 

    // this is two 
    if (position.personalCode.length == 4 && userID !== 500) { 

        // check if sender is one level
        let senderPositions = await findAll(POSITION, {userID: ticket.userID}, false, ["personalCode"])
        let levelOneSenderPositions = senderPositions.filter(senderPosition => senderPosition.personalCode.length == 2)

        if (levelOneSenderPositions.length !== 0) {
            
            // check if sender is his admin 
            let adminPositions = levelOneSenderPositions.filter(i => i.personalCode == position.personalCode.slice(0,2))
            
            if (adminPositions.length == 0) {
                return res.json({message: "نمیتوانید به مدیر کل سازمان پیام ارسال کنید!"})
            }
 
        } 
        
    }
 
 
    // create
    var id = await RESPONSE.max('id', {}) + 1 || 1;
    var seen = []

    var message = await create(RESPONSE, {
        id, userID, content, ticketID, seen
    });

    
    // if not db created!
    if(typeof(message) !== 'object')
        return res.json({message: 'ثبت نشد متاسفانه!'}); 

    // notify 
    return res.json({message: 'با موفقیت ثبت شد!'})


}

//
module.exports = AddResponse