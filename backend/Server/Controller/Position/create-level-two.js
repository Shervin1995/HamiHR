const {POSITION, LEVELTWO, LEVELONE} = require("../../DataBase/Model");
const {create, findOne} = require("../../DataBase/Function");



async function create500_two(userID, leveloneID, title) {
    
    var id = await LEVELTWO.max('id', {}) + 1;
    var order = await LEVELTWO.max('order', {leveloneID}) + 1
  
    // level 2
    await create(LEVELTWO, {
        id: id, 
        title: title,
        order: order,
        leveloneID: leveloneID
    });
     
    // personalCode
    var levelOne = await findOne(LEVELONE, {id: leveloneID})
    var part1 = levelOne.id <= 9 ? ("0" + levelOne.id) : `${levelOne.id}`
    var part2 = order <= 9 ? ("0" + order) : `${order}`
    var personalCode = part1 + part2;
    
    // position
    create(POSITION, {
        id: await POSITION.max('id', {}) + 1,
        personalCode: personalCode,
        leveloneID: leveloneID,
        leveltwoID: id,
        levelthreeID: null,
        userID: userID
    });

}

//
module.exports = create500_two