import axios from "axios";

// ---------------------------------------------------
// get token from browser
// ---------------------------------------------------
function authHeader() { 
  let data = localStorage.getItem('psyAccessToken');

  if (data) { return { "x-access-token": data }; } else { return {}; }
};

// ---------------------------------------------------
// set API for axios 
// ---------------------------------------------------
const http = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://juniortargets.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
}); 

//-----------------------------------------------------
// call APIs
//-----------------------------------------------------
class service {
  
  // --------------------------------------------
  // authorization
  // --------------------------------------------

  sendMobile(mobile){
    return http.get(`/login?mobile=${mobile}`);
  }

  sendOTP(data){
    return http.get(`/otp?mobile=${data.mobile}&num1=${data.num1}&num2=${data.num2}&num3=${data.num3}&num4=${data.num4}`);
  }

  // --------------------------------------------
  // users
  // --------------------------------------------

  // 1. profile   /auth/profile
  profile() { 
    return http.get(`/profile`, { headers: authHeader() });
  }
  
  // changePanel
  changePanel(id){
    return http.get(`/profile/change?newPositionID=${id}`, { headers: authHeader() });
  }

  
  // --------------------------------------------
  // orgchart
  // --------------------------------------------
 
  getOrgChart(){
    return http.get(`/positions/orgchart`, { headers: authHeader() });
  } 

  getUnitPositions(personalCode){
    return http.get(`/unit-positions/${personalCode}`, { headers: authHeader() });
  } 

  updatePosition(data){
    return http.post(`/position/update`, data, { headers: authHeader() });
  }
 
  deletePosition(data){
    return http.post(`/position/delete`, data, { headers: authHeader() });
  }

  getUserReports(userID){
    return http.get(`/user/reports?userID=${userID}`, { headers: authHeader() });
  }

  // --------------------------------------------
  // add user 
  // --------------------------------------------
  
  createClerk(data) { 
    return http.post(`/user/create`, data, { headers: authHeader() });
  } 

  // --------------------------------------------------
  // noposition
  // --------------------------------------------------

  getNoPosition(){
    return http.get(`/user/noposition`, { headers: authHeader() }); 
  }

  deleteClerk(data) { 
    return http.post(`/user/delete`, data, { headers: authHeader() });
  }

  // --------------------------------------------------
  //  add position
  // --------------------------------------------------

  // 6. add position  (userID, title(null), leveloneID(null), leveltwoID(null))
  AddPosition(data) { 
    return http.post(`/position/create`, data, { headers: authHeader() });
  }

  // 7. get all ones (id, title)
  getOnes() { 
    return http.get(`/unit/one`, { headers: authHeader() });
  }
 
  // 8. get related twos (id, title)
  getTwos(id) { 
    return http.get(`/unit/two?leveloneID=${id}`, { headers: authHeader() });
  }
 
  // 9. get all users  (firstname, lastname, id)
  getAllUsers() { 
    return http.get(`/user/all`, { headers: authHeader() });
  } 

  // ------------------------------------------------------
  // Report
  // ------------------------------------------------------

  AddReport(data){
    return http.post(`/report/create`, data, { headers: authHeader() });
  }
  getReport(reportID){
    return http.get(`/reports/${reportID}`, { headers: authHeader() });
  }
  getReports(){
    return http.get(`/reports`, { headers: authHeader() });
  }
 
  UpdateReport(data){
    return http.post(`/report/update`, data, { headers: authHeader() });
  }

  // ------------------------------------------------------
  // ticket
  // ------------------------------------------------------

  getTicketUsers(){
    return http.get(`/ticket/users`, { headers: authHeader() });
  }

  writeTicket(data){
    return http.post(`/ticket/create`, data, { headers: authHeader() });
  }

  getAllTickets(){
    return http.get(`/tickets`, { headers: authHeader() });
  }
  
  writeResponse(data){
    return http.post(`/response/create`, data, { headers: authHeader() });
  }

  getSingleTicket(ticketID){
    return http.get(`/tickets/${ticketID}`, { headers: authHeader() });
  }

  justSeen(data){
    return http.post(`/ticket/seen`, data, { headers: authHeader() });
  }

  getAllTickets_User(userID){
    return http.get(`/ticket/allforuser?userID=${userID}`, { headers: authHeader() });
  }

  // ------------------------------------------------------
  // Media
  // ------------------------------------------------------

  addMedia(data){
    return http.post(`/media/create`, data, { headers: authHeader() });
  }

  getAllMedia(){
    return http.get(`/medias`, { headers: authHeader() });
  } 

  getMedia(mediaID){
    return http.get(`/medias/${mediaID}`, { headers: authHeader() });
  }

  updateMedia(data){
    return http.post(`/media/update`, data, { headers: authHeader() });
  }

  deleteMedia(data){
    return http.post(`/media/delete`, data, { headers: authHeader() });
  }

}

// 
export default new service();