const {MEDIA} = require("../../DataBase/Model")
const {create} = require("../../DataBase/Function")

async function AddMedia(req, res) {
    
    var userid = req.data.id;
    var positionID = req.data.positionID;

    if (positionID == null) {
        return res.json({message: "دسترسی ندارید!"})
    }
 
    create(MEDIA, {
        id: await MEDIA.max("id", {}) + 1 || 1,
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        shared: [req.body.shared],
        creatorID: userid
    })
 

    res.json({message: 'ساخته شد!'})
}

//
module.exports = AddMedia