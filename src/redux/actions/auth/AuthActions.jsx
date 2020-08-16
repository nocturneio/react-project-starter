import {AUTH_LOGIN_USER, AUTH_LOGOUT_USER} from "../ActionTypes";

export const loginUser = data => ({type: AUTH_LOGIN_USER, payload: data});
export const logoutUser = data => ({type: AUTH_LOGOUT_USER, payload: data});
