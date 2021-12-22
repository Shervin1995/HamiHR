

const controller = { 

    // ------------------------------------------------------
    // authorize
    // ------------------------------------------------------
    OTPVerification: require('./OTPVerification'),
    prepareOTP: require('./PrepareOTP'), 

    // ------------------------------------------------------
    // home
    // ------------------------------------------------------
    home: require('./home'), 

    // profile
    // ------------------------------------------------------
    profile: require('./Profile/profile'),
    changePanel: require("./Profile/changePanel"),

    // ------------------------------------------------------
    // user
    // ------------------------------------------------------
    createUser: require('./User/create'), 
    deleteUser: require('./User/delete'), 
    updateUser: require('./User/update'), 
    getNoPosition: require('./User/noPosition'), 
    getAllUsers: require('./User/All'), 

    // ------------------------------------------------------
    // position
    // ------------------------------------------------------
    updatePosition: require("./Position/update"),
    deletePosition: require("./Position/delete"),
    joinPosition: require("./Position/create"),

    getUnitPositions: require("./Unit/getUnitPositions"),
    positions_orgChart: require("./Position/positions-org-chart"),

    getUserReports: require("./Unit/getUserReports"),

    // ------------------------------------------------------
    // Unit
    // ------------------------------------------------------
    getOnes: require("./Unit/getUnits").getOnes,
    getTwos: require("./Unit/getUnits").getTwos,

    // ------------------------------------------------------
    // Report
    // ------------------------------------------------------
    AddReport: require("./Report/add"),
    getReport: require("./Report/getSingle"),
    getReports: require("./Report/getAll"),
    UpdateReport: require("./Report/update"),

    // ------------------------------------------------------
    // Ticket
    // ------------------------------------------------------
    AddTicket: require("./Ticket/add"),
    getPersonalCodes: require("./Ticket/getPersonalCodes"),
    getAllTickets: require("./Ticket/getAll"),
    getSingleTicket: require("./Ticket/getOne"),
    AddResponse: require("./Ticket/addResponse"),
    DeleteResponse: require("./Ticket/delete"),
    SeenTicket: require("./Ticket/seen"),
    getAllForUser: require("./Ticket/getAllforUser"),

    // ------------------------------------------------------
    // Media
    // ------------------------------------------------------
    AddMedia: require("./Media/create"),
    getAllMedias: require("./Media/getAll"),
    getMedia: require("./Media/getOne"),
    UpdateMedia: require("./Media/update"),
    DeleteMedia: require("./Media/delete"),
    
} 
 

//
module.exports = controller
