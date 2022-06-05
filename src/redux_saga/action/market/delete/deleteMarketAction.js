import {
    DELETE_MARKET_ERROR,
    DELETE_MARKET_START,
    DELETE_MARKET_SUCCESS
} from "../../../constants/market/delete/constants";


export const deleteMarketStart = (id) => {
    return {
        type: DELETE_MARKET_START,
        payload: id
    }
};
export const deleteMarketSuccess = (data) => {
    return {
        type: DELETE_MARKET_SUCCESS,
        payload: data
    }
};
export const deleteMarketError = (e) => {
    return {
        type: DELETE_MARKET_ERROR,
        payload: e
    }
};