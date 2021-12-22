import { 
  DELETE_MEET, 
  DELETE_USER, 
  UPDATE_MEET, 
  UPDATE_USER ,
  ADD_MEET,
  LOGIN,
  OTP
} from "../actions/types";


var initialState = {}
function tutorialReducer(tutorials = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case LOGIN:
      return payload;
  
    case OTP:
      return payload; 

    case UPDATE_USER:
      return payload;
  
    case DELETE_USER:
      return payload; 
      
    case UPDATE_MEET:
      return payload;
 
    case ADD_MEET:
      return payload;
  
    case DELETE_MEET:
      return payload; 
      
    default:
      return tutorials;
  }
  
};

export default tutorialReducer;