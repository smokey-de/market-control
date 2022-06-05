import {GET_MARKET_ERROR, GET_MARKET_START, GET_MARKET_SUCCESS} from "../../constants/market/constants";
import {GET_TYPE_ERROR, GET_TYPE_START, GET_TYPE_SUCCESS} from "../../constants/type/costants";

export const getTypeStart = () => {
    return {
        type: GET_TYPE_START,
    }
};
export const getTypeSuccess = (data) => {
    return {
        type: GET_TYPE_SUCCESS,
        payload: data
    }
};
export const getTypeError = (e) => {
    return {
        type: GET_TYPE_ERROR,
        payload: e
    }
};