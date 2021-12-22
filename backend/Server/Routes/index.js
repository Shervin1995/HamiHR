const router = require('express').Router()
const controller = require('../Controller'); 
const middlewares = require('../Middleware')

const {

    token,
    isMobileValid,
    findUserByMobile,

    inSameGroup,
    createWhichLevel,
    combineBasicInfoWithPosition,

} = middlewares;

const {

    home,

    OTPVerification,
    prepareOTP,

    profile,
    changePanel,

    createUser,
    deleteUser,
    updateUser,
    getNoPosition,
    getAllUsers,

    updatePosition,
    deletePosition,
    joinPosition,

    getUnitPositions,
    positions_orgChart,

    getOnes,
    getTwos,
    getUserReports,

    AddReport,
    getReports,
    getReport,
    UpdateReport,

    AddTicket,
    getPersonalCodes,
    getAllTickets,
    getSingleTicket,
    AddResponse, 
    DeleteResponse,
    SeenTicket,
    getAllForUser,

    AddMedia,
    getAllMedias,
    getMedia,
    UpdateMedia,
    DeleteMedia

} = controller

// ---------------------------------------------------
// ALL ROUTES
// ---------------------------------------------------

// home
router.get('/', home);

// authorize 
router.get('/api/otp', [isMobileValid, findUserByMobile], OTPVerification);
router.get('/api/login', [isMobileValid, findUserByMobile], prepareOTP);

// profile
router.get('/api/profile', token, profile); 
router.get('/api/profile/change', token, changePanel); 

// user (basic info)
router.post('/api/user/create', token, createUser);  
router.post('/api/user/delete', token, deleteUser);  
router.post('/api/user/update', [token, inSameGroup], updateUser);  
router.get('/api/user/noposition', token, getNoPosition);  
router.get('/api/user/all', token, getAllUsers);  

// position
router.post('/api/position/update', [token, inSameGroup], updatePosition);
router.post('/api/position/delete', [token, inSameGroup], deletePosition);
router.post('/api/position/create', [token, createWhichLevel], joinPosition); 

router.get('/api/unit-positions/:personalCode', token, getUnitPositions);
router.get('/api/positions/orgchart', [token, combineBasicInfoWithPosition], positions_orgChart);

// Unit
router.get('/api/unit/one', token, getOnes);
router.get('/api/unit/two', token, getTwos);
router.get('/api/user/reports', token, getUserReports);


// Report
router.get('/api/reports/:reportID', token, getReport);
router.get('/api/reports', token, getReports);
router.post('/api/report/create', token, AddReport);
router.post('/api/report/update', token, UpdateReport);

// Ticket
router.post('/api/ticket/create', token, AddTicket);
router.get('/api/ticket/users', [token, combineBasicInfoWithPosition], getPersonalCodes);
router.get('/api/tickets', token, getAllTickets);
router.get('/api/tickets/:ticketID', token, getSingleTicket);
router.post('/api/response/create', token, AddResponse);
router.post('/api/response/delete', token, DeleteResponse);
router.post('/api/ticket/seen', token, SeenTicket);
router.get('/api/ticket/allforuser', token, getAllForUser);

// Media
router.post('/api/media/create', token, AddMedia);
router.get('/api/medias', token, getAllMedias);
router.get('/api/medias/:mediaID', token, getMedia);
router.post('/api/media/update', token, UpdateMedia);
router.post('/api/media/delete', token, DeleteMedia);


//
module.exports = router;