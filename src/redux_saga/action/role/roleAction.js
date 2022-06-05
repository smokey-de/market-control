import {GET_ROLE_ERROR, GET_ROLE_START, GET_ROLE_SUCCESS} from "../../constants/role/constants";

export const getRoleStart = () => {
    return {
        type: GET_ROLE_START,
    }
};
export const getRoleSuccess = (data) => {
    return {
        type: GET_ROLE_SUCCESS,
        payload: data
    }
};
export const getRoleError = (e) => {
    return {
        type: GET_ROLE_ERROR,
        payload: e
    }
};