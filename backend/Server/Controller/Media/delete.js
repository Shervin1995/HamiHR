const {MEDIA} = require("../../DataBase/Model")

 
// ---------------------------------------------
// 
// ---------------------------------------------
async function DeleteMedia(req, res) {
    
    var userid = req.data.id
    var id = req.body.mediaID

    if (!id) return res.json({message: "اطلاعات لازم را ارسال نکردید!"});
    
    if (userid !== 500) {
            
        var media = await MEDIA.findOne({
            where: {
                id: id, 
                creatorID: userid
            }
        })

        if (!media) return res.json({message: " فقط وارد کننده فایل میتواند ان را حذف کند!"});
        
    }
         
    MEDIA.destroy({
        where: {id}
    })

    return res.json({message: "حذف شد!"})

}

//
module.exports = DeleteMedia