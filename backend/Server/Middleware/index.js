

const middlewares = { 

    // authorization
    token: require('./login/token'),
    isMobileValid: require('./login/isMobileValid'),
    findUserByMobile: require('./login/findUserByMobile'),

    // position
    inSameGroup: require("./position/inSameGroup"),
    createWhichLevel: require("./position/createWhichLevel"),
    combineBasicInfoWithPosition: require("./position/combineBasicInfoWithPosition"),

}

module.exports = middlewares