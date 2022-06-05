import {SAVE_MARKET_ERROR, SAVE_MARKET_START, SAVE_MARKET_SUCCESS} from "../../../constants/market/post/constants";
import {DELETE_USER_ERROR, DELETE_USER_START, DELETE_USER_SUCCESS} from "../../../constants/user/delete/constants";
import {GET_USER_ACTIVE_ERROR, GET_USER_ACTIVE_START, GET_USER_ACTIVE_SUCCESS} from "../../../constants/user/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false ,
    loading2: false,
    success2: false,
    message2: {},
    error2: false
};
const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case DELETE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        case GET_USER_ACTIVE_START:
            return {
                ...state,
                loading2: true,
                success2: false,
                error2: false,
                message2: {}
            };
        case GET_USER_ACTIVE_SUCCESS:
            return {
                ...state,
                loading2: false,
                success2: true,
                message2: action.payload.message
            };
        case GET_USER_ACTIVE_ERROR:
            return {
                ...state,
                loading2: false,
                error2: true,
                message2: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state
    }
};
export default deleteUserReducer