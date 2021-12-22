const {USER} = require('../../DataBase/Model')

// ----------------------------------------
// find user by mobile
// ----------------------------------------
async function findUserByMobile(req, res, next) {
    
    var mobile = req.query.mobile;

    try { 
        
        var user = await USER.findOne({
            raw: true,
            where: {mobile}
        });

        req.userData = user;
        next();

    } catch (error) {

        console.log(error);
        return res.json({message: 'database err!'});

    }
    
    
}
      
//
module.exports = findUserByMobile