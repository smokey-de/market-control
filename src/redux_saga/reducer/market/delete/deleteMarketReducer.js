import {SAVE_MARKET_ERROR, SAVE_MARKET_START, SAVE_MARKET_SUCCESS} from "../../../constants/market/post/constants";
import {
    DELETE_MARKET_ERROR,
    DELETE_MARKET_START,
    DELETE_MARKET_SUCCESS
} from "../../../constants/market/delete/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false
};
const deleteMarketReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_MARKET_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case DELETE_MARKET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case DELETE_MARKET_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state}
};
export default deleteMarketReducer