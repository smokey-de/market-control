import {GET_MANAGER_ERROR, GET_MANAGER_START, GET_MANAGER_SUCCESS} from "../../constants/manager/constants";

export const getManagerStart = (filter,  val) => {
    return {
        type: GET_MANAGER_START,
        val: val,
        filter:filter
    }
};
export const getManagerSuccess = (data) => {
    return {
        type: GET_MANAGER_SUCCESS,
        payload: data
    }
};
export const getManagerError = (e) => {
    return {
        type: GET_MANAGER_ERROR,
        payload: e
    }
};