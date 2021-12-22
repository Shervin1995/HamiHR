const {POSITION, LEVELTHREE, LEVELTWO, LEVELONE} = require("../../DataBase/Model");
const {findOne, destroy} = require("../../DataBase/Function");


// ------------------------------------------
// posible relations: 
// ------------------------------------------
//
// (1) "500-one"    means  500        delete   levelone      
// (2) "500-two"    means  500        delete   leveltwo 
// (3) "500-three"  means  500        delete   levelthree
//
// (4) "one-two"    means  levelone   delete   levelttwo 
// (5) "one-three"  means  levelone   delete   levelthree
//
// (6) "two-three"  means  leveltwo   delete   levelthree
//
// ------------------------------------------
async function deletePosition(req, res) {

    //
    var relation = req.method.relation 
    var userPosition = req.method.userPosition
    var child;

    //
    switch (relation) {
        case "500-one":
                
            // hasChild
            child = await findOne(LEVELTWO, {leveloneID: userPosition.leveloneID})
            if (child !== null) return res.json({message: "زیر مجموعه را ابتدا حذف کنید!"})

            // delete
            await destroy(POSITION, {id:  userPosition.id});
            destroy(LEVELONE, {id: userPosition.leveloneID});
        break; 
        case "500-two":
        
            // hasChild
            child = await findOne(LEVELTHREE, {leveltwoID: userPosition.leveltwoID})
            if (child !== null) return res.json({message: "زیر مجموعه را ابتدا حذف کنید!"})

            // delete
            await destroy(POSITION, {id:  userPosition.id});
            destroy(LEVELTWO, {id: userPosition.leveltwoID});
        break;
        case "500-three":

            // delete
            await destroy(POSITION, {id: userPosition.id});
            destroy(LEVELTHREE, {id: userPosition.levelthreeID});
        break; 
        case "one-two":
        
            // hasChild
            child = await findOne(LEVELTHREE, {leveltwoID: userPosition.leveltwoID})
            if (child !== null) return res.json({message: "زیر مجموعه را ابتدا حذف کنید!"})
            
            // delete
            await destroy(POSITION, {id:  userPosition.id});
            destroy(LEVELTWO, {id: userPosition.leveltwoID});
        break;
        case "one-three":
            
            // delete
            await destroy(POSITION, {id:  userPosition.id});
            destroy(LEVELTHREE, {id: userPosition.levelthreeID});
        break;

        case "two-three":
        
            // delete
            await destroy(POSITION, {id: userPosition.id});
            destroy(LEVELTHREE, {id: userPosition.levelthreeID});
        break;
    
    }

    
    //
    return res.json({message: `${relation} حذف شد!`})
}
 
//
module.exports = deletePosition



