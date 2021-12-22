const moment = require('moment');
const {update} = require('../../DataBase/Function');
const {USER} = require('../../DataBase/Model')
const generateToken = require('./generateToken');

// ----------------------------------------
//  /api/otp   POST
// ----------------------------------------
async function Verify(req, res) { 
  
    const mobile = req.query.mobile;
    var user = req.userData; 
    
        // ok  lastSend, otp                  (after otp sent)
        // ok  failedTries, lastFailedTry     (otp invalid, lastFailedTry is over 5 min, failedTries < 3)
        // ok  isSuspended, lastSuspend       (otp invalid, lastFailedTry is under 5 min, failedTries == 3)
        // ok  lastSuccessLogin , isMobileVerified        (otp valid)
        
    // user not exists 
    if (!user) return res.json({message: 'send your mobile number first!'});

    // over 120 
    var a = moment(new Date());
    var b = moment(user.lastSend); 
    if (a.diff(b) > 120000) return res.json({
        message: 'You sent otp too late!'
      });  
    // in 20 min suspended
    if (user.isSuspended) {
      var c = moment(user.lastSuspend);
      if (a.diff(c) < 1200000) return res.json({
          message: `Get back in ${20 - Math.round(a.diff(c)/60000)} minutes!`
        })
    }


    if(req.query.num1 == user.otp[0] &&
       req.query.num2 == user.otp[1] &&
       req.query.num3 == user.otp[2] &&
       req.query.num4 == user.otp[3] ){ 
         
        // ----------------------------------------
        // otp is valid --> token
        // ----------------------------------------
        var filter = {
          otp: [],
          failedTries: 0,
          lastSuccessLogin: new Date()
        };
        if (!user.isMobileVerified) { filter.isMobileVerified = true };
        if (user.isSuspended) { filter.isSuspended = false };
        update(USER, filter, {where: {mobile} }); 

        // create token 
        const token = await generateToken(user);

        // send frontend
        return res.json({
          token: token,
          message: 'welcome'
        });

    }  

    // ----------------------------------------
    // invalid otp --> (2) isSuspend, failedTries
    // ----------------------------------------
 
    var d = moment(user.lastFailedTry);

    // if last fail is 5 min ago, ignore failedTries 
    if (a.diff(d) > 300000) { 
      user.failedTries = 0 ;
      update(USER, {
        failedTries: 0 
      }, {where: {mobile}});
    }

    // get suspended
    if (a.diff(d) < 300000 &&
        user.failedTries &&
        user.failedTries > 0 &&
        (user.failedTries + 1) % 4 == 0 
        ) {

      update(USER, {
        otp: [],
        failedTries: 0, 
        isSuspended: true,
        lastSuspend: new Date()
      }, {where: {mobile}});
      return res.json({
        message: 'too many tries! You cannot login till 20 min later!'
      });

    } else {

      // just an ordinary fail
      update(USER, {
        otp: [],
        lastFailedTry: new Date(), 
        failedTries: user.failedTries + 1 
      }, {where: {mobile}});

    }

    // ----------------------------------------
    // clear failedLogins after 5 minutes
    // ----------------------------------------
    // setTimeout(() => {
    //   update(USER, {failedTries: 0},{where: {mobile}});
    //   console.log('failedTries Cleaned!');
    // }, 300000);

    // ----------------------------------------
    // send frontend 
    // ----------------------------------------
    return res.json({
      timesLeft: 4 - ((user.failedTries + 1) % 4),
      message: 'Invalid OTP! Ckick on resend!'
    }) 
  
}
  
module.exports = Verify
