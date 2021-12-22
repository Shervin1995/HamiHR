
const {findAll, findOne, create} = require("../../DataBase/Function");
const {USER, POSITION} = require("../../DataBase/Model");


// --------------------------------
// level verified
// --------------------------------
async function createUser(req, res) {
     
    // 
    var newuser = req.body;  
    var userid = req.data.id; 

    // permision to level 1 and level 2 positions
    var positions = await findAll(POSITION, {userID: userid});
    var admins = positions.filter(position => position.levelthreeID == null);
    if (admins.length == 0) 
        return res.json({message: "اجازه افزودن فقط برای مدیران!"})
    
    // this mobile is already exists on system
    var user = await findOne(USER, {mobile: newuser.mobile});
    if (user) 
        return res.json({message: 'کاربر دیگری با این موبایل ثبت شده است.'})

    // just create 
    var message = await create(USER, {
        id: await USER.max('id', {}) + 1, 
        mobile: newuser.mobile,
        firstname: newuser.firstname,     
        lastname: newuser.lastname,     
        sex: newuser.sex,     
        born: newuser.born,
        shenase: newuser.shenase,
        isArchived: false
    });

    // if not db created!
    if(typeof(message) !== 'object')
        return res.json({message: 'not db created!'}); 

    // notify 
    return res.json({message: 'created successfully!'})

}

//
module.exports = createUser