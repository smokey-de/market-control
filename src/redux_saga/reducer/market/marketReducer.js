import {GET_MARKET_ERROR, GET_MARKET_START, GET_MARKET_SUCCESS} from "../../constants/market/constants";


const initialState = {
    loading: false,
    success: false,
    data: [],
    error: false,
    message: {}
};
const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKET_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                data: [],
                message: {}
            };
        case GET_MARKET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data:action.payload.data
            };
        case GET_MARKET_ERROR:
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
};export default marketReducer