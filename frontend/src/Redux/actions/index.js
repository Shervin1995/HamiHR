import { 
  UPDATE_MEET,
  DELETE_MEET,
  DELETE_USER,
  UPDATE_USER,
  ADD_MEET,
  LOGIN,
  OTP
} from "./types";

import service from "../../Axios";

 

  // --------------------------------
  //          send mobile
  // --------------------------------
  export const sendMobile = (data) => async (dispatch) => {
    try { 
      const res = await service.sendMobile(data); 
  
      dispatch({
        type: LOGIN,
        payload: res.data
      });
      return Promise.resolve(res.data);
  
    } catch (err) {
      return Promise.reject(err);
    }
  }
  
  // --------------------------------
  //         send otp
  // --------------------------------
  export const sendOTP = (data) => async (dispatch) => {
    try { 
      const res = await service.sendOTP(data); 
  
      dispatch({
        type: OTP,
        payload: res.data
      });
      return Promise.resolve(res.data);
  
    } catch (err) {
      return Promise.reject(err);
    }
  }
  // --------------------------------
  //          add meet
  // --------------------------------
  export const addMeet = (data) => async (dispatch) => {
    try { 
      const res = await service.addMeet(data); 
  
      dispatch({
        type: ADD_MEET,
        payload: res.data
      });
      return Promise.resolve(res.data);
  
    } catch (err) {
      return Promise.reject(err);
    }
  }
  // --------------------------------
  //          delete meet
  // --------------------------------
  export const deleteMeet = (data) => async (dispatch) => {
    try { 
      const res = await service.deleteMeet(data); 
  
      dispatch({
        type: DELETE_MEET,
        payload: res.data
      });
      return Promise.resolve(res.data);
  
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // --------------------------------
  //          update meet
  // --------------------------------
  export const updateMeet = (data) => async (dispatch) => {
  try {  
    const res = await service.updateMeet(data); 

    dispatch({
      type: UPDATE_MEET,
      payload: res.data
    });
    return Promise.resolve(res.data);

  } catch (err) {
    return Promise.reject(err);
  }
};

  // --------------------------------
  //          delete user
  // --------------------------------
  export const deleteUser = (data) => async (dispatch) => {
    try { 
      const res = await service.deleteUser(data); 
  
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
      return Promise.resolve(res.data);
  
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // --------------------------------
  //          update user
  // --------------------------------
  export const updateUser = (data) => async (dispatch) => {
  try {  
    const res = await service.updateUser(data); 

    dispatch({
      type: DELETE_USER,
      payload: res.data
    });
    return Promise.resolve(res.data);

  } catch (err) {
    return Promise.reject(err);
  }
};
 
