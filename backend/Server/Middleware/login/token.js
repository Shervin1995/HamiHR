const verify = require("jsonwebtoken/verify");
const My_SECRET = '7Sta-DeTh-dfS!-0AH`-1U23'


async function decodeToken(req, res, next) {
     
    var token = req.headers['x-access-token']; 

    // token is not defined 
    if (!token) return res.status(422).json('token is not defined!');

    // 
    try { 
        var decoded = await verify(token, My_SECRET); 
        req.data = decoded; 
        next();
    } catch (error) {  
        console.log('error: ',error);
        return res.status(422).json('token is expired!');
    }  

}

module.exports = decodeToken



