import {SAVE_CONNECT_ERROR, SAVE_CONNECT_START, SAVE_CONNECT_SUCCESS} from "../../../constants/market/conect/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false
};
const postConnectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CONNECT_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case SAVE_CONNECT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case SAVE_CONNECT_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state}
};
export default postConnectReducer