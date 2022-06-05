import {SAVE_MARKET_ERROR, SAVE_MARKET_START, SAVE_MARKET_SUCCESS} from "../../../constants/market/post/constants";


export const postMarketStart = (val) => {
    return {
        type: SAVE_MARKET_START,
        payload: val
    }
};
export const postMarketSuccess = (data) => {
    return {
        type: SAVE_MARKET_SUCCESS,
        payload: data
    }
};
export const postMarketError = (e) => {
    return {
        type: SAVE_MARKET_ERROR,
        payload: e
    }
};