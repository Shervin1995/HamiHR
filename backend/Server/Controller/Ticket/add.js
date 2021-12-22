
const { create, findOne, findAll} = require("../../DataBase/Function");
const {TICKET, POSITION, MEDIA} = require("../../DataBase/Model");
const {Op} = require("sequelize")

// --------------------------------
//
// --------------------------------
async function AddTicket(req, res) {


    var thisPositionID = req.data.positionID;

    // no position
    if (thisPositionID == null) {
        return res.json({message: 'فقط پوزیشن دار ها میتوانند تیکت ایجاد کنند!'}) 
    }

    var thisPosition = await findOne(POSITION, {id: thisPositionID})
    var thisPC = thisPosition.personalCode;
 
    //
    var 
    content = req.body.content,
    title = req.body.title,
    userID = req.data.id,
    media = JSON.parse(req.body.media),
    contacts = JSON.parse(req.body.contacts)
   
    
    // not received
    if (media == undefined ||
        content == undefined ||
        title == undefined ||
        contacts == undefined 
    ) return res.json({message: 'لطفا اطلاعات مورد نیاز را وارد کنید!'});

    if (typeof media !== "object") return res.json({message: 'فرمت کانتکت ها اشتباه است!'}); 
    if (typeof contacts !== "object") return res.json({message: 'فرمت کانتکت ها اشتباه است!'}); 
    if (contacts.length == 0) return res.json({message: 'حداقل یک مخاطب را انتخاب کنید!'}); 

    
    var contacts1 = [];  
 

    //
    if (userID == 500) {

        var thepositions = await findAll(POSITION, {personalCode: contacts}, false, ["userID"]);
        if (thepositions.length == 0) return res.json({message: 'هیچ مخاطبی یافت نشد!'}); 
        contacts1 = thepositions.map(position => position.userID);
        
    } else {    

        // validate contacts
        switch (thisPC.length) {
            case 2:

                // can this user send to these contacs 
                var filteredContacts = contacts.filter(pc => thisPC == pc.slice(0, 2));
                var thepositions = await findAll(POSITION, {personalCode: filteredContacts}, false, ["userID"]);
                contacts1 = thepositions.map(position => position.userID)
                var isAdmin = contacts.includes("00");
                if (isAdmin) { contacts1.push(500) }  

            break;
            case 4:
                
                var filteredContacts1 = contacts.filter(pc => pc.length == 6 && pc.slice(0, 4) == thisPC);
                var filteredContacts2 = contacts.filter(pc => pc.length == 2 && thisPC.slice(0, 2) == pc);
                var filteredContacts = [...filteredContacts1, ...filteredContacts2];

                var thepositions = await findAll(POSITION, {personalCode: filteredContacts}, false, ["userID"]);
                if (thepositions.length == 0) return res.json({message: 'هیچ مخاطبی یافت نشد!'});  
                contacts1 = thepositions.map(position => position.userID)

            break;
            case 6:

                var adminPosition = await findOne(POSITION, {personalCode: thisPC.slice(0, 4)});
                if (!adminPosition) return res.json({message: 'هیچ مخاطبی یافت نشد!'}); 
                contacts1 = [adminPosition.userID]

            break; 
        }
        
    }

    contacts = contacts1
    var seen = []
    

    //
    var medias = await MEDIA.findAll({
        where: {id: {[Op.in]: media}},
        raw: true,
        attributes: ["id", "shared"]
    })

    //
    medias = medias.reduce((cur, item, i) => {
        cur.push({
            id: item.id,
            shared: [...new Set([...contacts, ...item.shared])]
        })    
        return cur;  
    }, [])
    
    // 
    var id = await TICKET.max('id', {}) + 1 || 1
    
    try {
        
        // 
        await MEDIA.bulkCreate(medias, { updateOnDuplicate: ["shared"] })

        // 
        await create(TICKET, {
            id, userID, content, title, contacts, seen, media
        });  

        // notify 
        return res.json({message: 'با موفقیت ثبت شد!'})

    } catch (error) {
        console.log(error);
        return res.json({message: 'ثبت نشد متاسفانه!'});
    } 
 

}

//
module.exports = AddTicket