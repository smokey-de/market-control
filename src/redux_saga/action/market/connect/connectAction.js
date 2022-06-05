import {SAVE_MARKET_ERROR, SAVE_MARKET_START, SAVE_MARKET_SUCCESS} from "../../../constants/market/post/constants";
import {SAVE_CONNECT_ERROR, SAVE_CONNECT_START, SAVE_CONNECT_SUCCESS} from "../../../constants/market/conect/constants";


export const postConnectStart = (userId, marketId) => {
    return {
        type: SAVE_CONNECT_START,
        userId:userId,
        marketId:marketId
    }
};
export const postConnectSuccess = (data) => {
    return {
        type: SAVE_CONNECT_SUCCESS,
        payload: data
    }
};
export const postConnectError = (e) => {
    return {
        type: SAVE_CONNECT_ERROR,
        payload: e
    }
};