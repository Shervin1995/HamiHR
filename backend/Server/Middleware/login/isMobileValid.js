

// is mobile valid
function isMobileValid(req, res, next) {

    var mobile = req.query.mobile; 
    var mobileArr = mobile.split('');
    
    if (
      mobileArr[0] == 0 &&
      mobileArr[1] == 9 &&
      mobileArr.length == 11 
    ){
      var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      mobileArr.forEach(x => {
        if (!arr.includes(x)) 
          return res.json({message: 'Mobile invalid characters!'});
      });

      return next();
    }
    
    return res.json({message: 'Mobile invalid characters!'})
}

//
module.exports = isMobileValid