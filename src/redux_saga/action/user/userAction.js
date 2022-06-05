import {GET_USER_ERROR, GET_USER_START, GET_USER_SUCCESS} from "../../constants/user/constants";

export const getUserStart = () => {
    return {
        type: GET_USER_START,
    }
};
export const getUserSuccess = (data) => {
    return {
        type: GET_USER_SUCCESS,
        payload: data
    }
};
export const getUserError = (e) => {
    return {
        type: GET_USER_ERROR,
        payload: e
    }
};