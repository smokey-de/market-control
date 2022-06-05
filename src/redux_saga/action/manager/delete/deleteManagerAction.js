import {
    DELETE_MANAGER_ERROR,
    DELETE_MANAGER_START,
    DELETE_MANAGER_SUCCESS
} from "../../../constants/manager/delete/constants";


export const deleteManagerStart = (val) => {
    return {
        type: DELETE_MANAGER_START,
        payload: val
    }
};
export const deleteManagerSuccess = (data) => {
    return {
        type: DELETE_MANAGER_SUCCESS,
        payload: data
    }
};

export const deleteManagerError = (e) => {
    return {
        type: DELETE_MANAGER_ERROR,
        payload: e
    }
};