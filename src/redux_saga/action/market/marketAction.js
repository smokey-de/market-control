import {GET_MARKET_ERROR, GET_MARKET_START, GET_MARKET_SUCCESS} from "../../constants/market/constants";

export const getMarketStart = () => {
    return {
        type: GET_MARKET_START,
    }
};
export const getMarketSuccess = (data) => {
    return {
        type: GET_MARKET_SUCCESS,
        payload: data
    }
};
export const getMarketError = (e) => {
    return {
        type: GET_MARKET_ERROR,
        payload: e
    }
};