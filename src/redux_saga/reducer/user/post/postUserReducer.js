import {
    SAVE_USER_ERROR,
    SAVE_USER_START,
    SAVE_USER_SUCCESS,
    SAVE_USER_SUCCESS_FALSE
} from "../../../constants/user/post/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false
};
const postUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case SAVE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case SAVE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        case SAVE_USER_SUCCESS_FALSE:
            return {
                success: false
            };
        default:
            return state}
};
export default postUserReducer