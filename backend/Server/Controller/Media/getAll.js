
const {findAll} = require("../../DataBase/Function")
const {MEDIA} = require("../../DataBase/Model")
const {Op} = require("sequelize")


//
async function GetAllMedias(req, res) {
    
    // 
    if (req.data.id == 500){
        var medias = await findAll(MEDIA ,{})
        return res.json(medias)
    } 

    var medias = await findAll(MEDIA, {
        [Op.or]: {
            creatorID: req.data.id,
            shared: {[Op.contains]: [req.data.id]}
        }
    }, false, ["id", "title"]) 
    res.json(medias)
    

}

//
module.exports = GetAllMedias