const moment = require('moment')
const {USER} = require('../../DataBase/Model')
const {update, create} = require('../../DataBase/Function');

// ----------------------------------------
//   /api/login     GET
// ----------------------------------------
async function sendingOTP(req, res) {
     
    var mobile = req.query.mobile; 
    var user = req.userData;  

        //   lastSend, otp
        //   failedTries, lastFailedTry
        //   isSuspended
        //   lastSuccessLogin , isMobileVerified
        
    // ------------------------------------- 
    // send OTP 
    // ------------------------------------- 
 
    // rand = sendOTPEmail(mobile);

    // var otp = [1, 1, 1, Math.floor(Math.random() * 9) + 1];
    var otp = [1, 1, 1, 2];

    if (!user) {
 
      return res.json({message: 'user not found!'});
      
    } else {

    // -------------------------------------
    // user exists --> update user otp, lastSend
    // -------------------------------------

      var a = moment(new Date());
      var b = moment(user.lastSend);

      // resend under 90 sec
      if (a.diff(b) < 90000) {
        return res.json({
          mobile: mobile,
          message: 'Already sent to this number!'
        }); 
      }

      // resend during 20 min suspended
      if (user.isSuspended) {
        var c = moment(user.lastSuspend);
        if (a.diff(c) < 1200000) {
          return res.json({
            message: `Get back in ${20 - Math.round(a.diff(c)/60000)} minutes!`
          })
        }
      }

      // update user otp
      var message = await update(USER, {
        otp: otp,
        lastSend: new Date()  
      }, {where: {mobile}});
      if(message !== 'update Successfully!')
        return res.json({message: 'not db updated!'});
      
      console.log('otp: ', otp);
      
    } 

    // -------------------------------------
    // send frontend
    // -------------------------------------
    return res.json({
		mobile: mobile,
		message: 'Sent to your phone!'
	})   
    
}


//
module.exports = sendingOTP