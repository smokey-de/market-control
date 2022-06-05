import {SAVE_MANAGER_ERROR, SAVE_MANAGER_START, SAVE_MANAGER_SUCCESS} from "../../../constants/manager/post/constants";


export const postManagerStart = (nimadur,val) => {
    return {
        type: SAVE_MANAGER_START,
        nimadur: nimadur,
        payload: val
    }
};
export const postManagerSuccess = (data) => {
    return {
        type: SAVE_MANAGER_SUCCESS,
        payload: data
    }
};

export const postManagerError = (e) => {
    return {
        type: SAVE_MANAGER_ERROR,
        payload: e
    }
};