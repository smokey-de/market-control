import {
    GET_PROFILE_DATA_ERROR,
    GET_PROFILE_DATA_START,
    GET_PROFILE_DATA_SUCCESS,
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    NO_FOUND, TRUE_FOUND,
} from "../../constants/constants";

export const loginStart = data => {
    return {
        type: LOGIN_START,
        payload: data
    }
};
export const loginSuccess = data => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
};
export const loginError = (e) => {
    return {
        type: LOGIN_ERROR,
        payload: e
    }
};
export const noFound = (status) => {
    return {
        type: NO_FOUND,
        payload: status
    }
};
export const getProfileDataStart = () => {
    return {
        type: GET_PROFILE_DATA_START,
    }
};
export const getProfileDataSuccess = (data) => {
    return {
        type: GET_PROFILE_DATA_SUCCESS,
        payload: data
    }
};
export const getProfileDataError = (e) => {
    return {
        type: GET_PROFILE_DATA_ERROR,
        payload: e
    }
};
export const logoutFromDashboard = () => {
    return {
        type: LOGOUT_USER
    }
};