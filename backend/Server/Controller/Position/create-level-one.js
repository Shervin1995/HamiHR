const {POSITION, LEVELONE} = require("../../DataBase/Model");
const {create} = require("../../DataBase/Function");



async function create500_one(userID, title) {
    var id = await LEVELONE.max('id', {}) + 1;
  
    // create level one
    await create(LEVELONE, {
        id: id, 
        title: title
    });
    
    var personalCode = id <= 9 ? ("0" + id) : `${id}`;
     
    // create position
    create(POSITION, {
        id: await POSITION.max('id', {}) + 1,
        personalCode: personalCode,
        leveloneID: id,
        leveltwoID: null,
        levelthreeID: null,
        userID: userID
    });

}

//
module.exports = create500_one