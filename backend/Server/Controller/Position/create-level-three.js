const {POSITION, LEVELTHREE, LEVELTWO, LEVELONE} = require("../../DataBase/Model");
const {create, findOne} = require("../../DataBase/Function");



async function create500_three(userID, leveloneID, leveltwoID) {
    
    var id = await LEVELTHREE.max('id', {}) + 1;
    var order3 = await LEVELTHREE.max('order', {leveltwoID}) + 1
  
    // level 2
    await create(LEVELTHREE, {
        id: id, 
        title: `همکار`,
        order: order3,
        leveltwoID: leveltwoID
    });
     
    // personalCode
    var levelOne = await findOne(LEVELONE, {id: leveloneID}); 
    var order2 = await LEVELTWO.max('order', {}) 

    // id of levelone is used as its order because its the same.
    var part1 = levelOne.id <= 9 ? ("0" + levelOne.id) : `${levelOne.id}`
    var part2 = order2 <= 9 ? ("0" + order2) : `${order2}`
    var part3 = order3 <= 9 ? ("0" + order3) : `${order3}`

    var personalCode = part1 + part2 + part3;
    
    // position
    create(POSITION, {
        id: await POSITION.max('id', {}) + 1,
        personalCode: personalCode,
        leveloneID: leveloneID,
        leveltwoID: leveltwoID,
        levelthreeID: id,
        userID: userID
    });

}

//
module.exports = create500_three