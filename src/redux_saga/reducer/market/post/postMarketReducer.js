import {SAVE_MARKET_ERROR, SAVE_MARKET_START, SAVE_MARKET_SUCCESS} from "../../../constants/market/post/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false
};
const postMarketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_MARKET_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case SAVE_MARKET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case SAVE_MARKET_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state}
};
export default postMarketReducer