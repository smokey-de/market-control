import {DELETE_USER_ERROR, DELETE_USER_START, DELETE_USER_SUCCESS} from "../../../constants/user/delete/constants";
import {GET_USER_ACTIVE_ERROR, GET_USER_ACTIVE_START, GET_USER_ACTIVE_SUCCESS} from "../../../constants/user/constants";

export const deleteUserStart = (report, rep,id) => {
    return {
        type: DELETE_USER_START,
        report:report,
        rep: rep,
        id: id
    }
};
export const deleteUserSuccess = (data) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: data
    }
};
export const deleteUserError = (e) => {
    return {
        type: DELETE_USER_ERROR,
        payload: e
    }
};

export const activeUserStart = (id) => {
    return {
        type: GET_USER_ACTIVE_START,
        payload: id
    }
};
export const activeUserSuccess = (data) => {
    return {
        type: GET_USER_ACTIVE_SUCCESS,
        payload: data
    }
};
export const activeUserError = (e) => {
    return {
        type: GET_USER_ACTIVE_ERROR,
        payload: e
    }
};