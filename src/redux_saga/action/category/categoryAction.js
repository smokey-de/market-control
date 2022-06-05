import {GET_CATEGORY_ERROR, GET_CATEGORY_START, GET_CATEGORY_SUCCESS} from "../../constants/category/constants";

export const getCategoryStart = (filter,  val) => {
    return {
        type: GET_CATEGORY_START,
        val: val,
        filter:filter
    }
};
export const getCategorySuccess = (data) => {
    return {
        type: GET_CATEGORY_SUCCESS,
        payload: data
    }
};
export const getCategoryError = (e) => {
    return {
        type: GET_CATEGORY_ERROR,
        payload: e
    }
};