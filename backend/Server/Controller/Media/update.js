const {MEDIA} = require("../../DataBase/Model") 

// 
async function UpdateMedia(req, res) {
    
    var creatorID = req.data.id;
    var id = req.body.mediaID;
    var title = req.body.title;
    var description = req.body.description;
    var link = req.body.link;
    var shared = req.body.shared;



    if (creatorID == 500) {

        await MEDIA.update({
            title,
            description,
            link,
            shared
        },{
            where: {
                id
            }
        })

        return res.json({message: "با موفقیت به روز شد!"})
    
    }

    //
    try {

        await MEDIA.update({
            title,
            description,
            link,
            shared
        },{
            where: {
                id,
                creatorID
            }
        })

        res.json({message: "با موفقیت به روز شد!"})
    
    } catch {
        
        res.json({message: "به روز نشد! متاسفانه!"})

    }
    


}


// 
module.exports = UpdateMedia