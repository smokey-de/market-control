import {
    SAVE_USER_ERROR,
    SAVE_USER_START,
    SAVE_USER_SUCCESS,
    SAVE_USER_SUCCESS_FALSE
} from "../../../constants/user/post/constants";


export const postUserStart = (val) => {
    return {
        type: SAVE_USER_START,
        payload: val
    }
};
export const postUserSuccess = (data) => {
    return {
        type: SAVE_USER_SUCCESS,
        payload: data
    }
};
export const postUserSuccessFalse = () => {
    return {
        type: SAVE_USER_SUCCESS_FALSE,
    }
};
export const postUserError = (e) => {
    return {
        type: SAVE_USER_ERROR,
        payload: e
    }
};