
const {findOne, findAll} = require("../../DataBase/Function")
const {MEDIA, USER} = require("../../DataBase/Model")


async function GetMedia(req, res) {
    
    var userid = req.data.id;
    var mediaID = req.params.mediaID
    var media = await findOne(MEDIA, {id: mediaID});


    var shared = await findAll(USER, {id: media.shared}, false, ["id", "firstname", "lastname"])

    var creator = await findOne(USER, {id: media.creatorID}, false, ["firstname", "lastname"]) 

    // check if this user can get this media 
    if (userid == 500 ||
        media.creatorID == userid || 
        media.shared.includes(userid)
    ) {
        return res.json({
            media: {
                id: media.id,
                link: media.link,
                title: media.title,
                description :media.description,
                creatorName: creator.firstname + ' ' + creator.lastname,
                shared: shared
            },
            isCreator: userid == 500 || userid == media.creatorID
        })
    }
 

    //
    return res.json({message: "شما نمیتوانید به این اطلاعات دسترسی داشته باشید!"})

    
}

//
module.exports = GetMedia