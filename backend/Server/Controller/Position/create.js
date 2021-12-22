const {POSITION} = require("../../DataBase/Model");
const {findOne} = require("../../DataBase/Function");
const create_level_one = require("./create-level-one")
const create_level_two = require("./create-level-two")
const create_level_three = require("./create-level-three")  

// ------------------------------------------
// posible relations: 
// ------------------------------------------
// (1) "500-one"        
// (2) "500-two"   
// (3) "500-three"  
// (4) "one-two"   
// (5) "one-three"  
// (6) "two-three" 
// ------------------------------------------
async function joinPosition(req, res) {

    //
    var relation = req.method.relation  
    var positionID = req.data.positionID
    var position = await findOne(POSITION, {id: positionID}); 

    var userID = req.body.userID   
    var leveltwoID = req.body.leveltwoID 
    var leveloneID = req.body.leveloneID 
    var title = req.body.title 

    //
    switch (relation) {
        case "500-one":
            await create_level_one(userID, title);
        break; 
        case "500-two":
            await create_level_two(userID, leveloneID, title);
        break;
        case "500-three":
            await create_level_three(userID, leveloneID, leveltwoID);
        break; 
        case "one-two":  
            await create_level_two(userID, position.leveloneID, title)
        break;
        case "one-three": 
            await create_level_three(userID, position.leveloneID, leveltwoID); 
        break; 
        case "two-three": 
            await create_level_three(userID, position.leveloneID, position.leveltwoID); 
        break;
    
    }
 
    //
    return res.json({message: ` اضافه شد!`})
}
 
//
module.exports = joinPosition



