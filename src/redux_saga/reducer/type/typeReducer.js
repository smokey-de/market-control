import {GET_MARKET_ERROR, GET_MARKET_START, GET_MARKET_SUCCESS} from "../../constants/market/constants";
import {GET_TYPE_ERROR, GET_TYPE_START, GET_TYPE_SUCCESS} from "../../constants/type/costants";


const initialState = {
    loading: false,
    success: false,
    data: [],
    error: false,
    message: {}
};
const typeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TYPE_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                data: [],
                message: {}
            };
        case GET_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data:action.payload.data
            };
        case GET_TYPE_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message,
            };
        default:
            return state
    }
};export default typeReducer