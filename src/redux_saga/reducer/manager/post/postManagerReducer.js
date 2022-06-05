import {SAVE_MANAGER_ERROR, SAVE_MANAGER_START, SAVE_MANAGER_SUCCESS} from "../../../constants/manager/post/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false
};
const postManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_MANAGER_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case SAVE_MANAGER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case SAVE_MANAGER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state}
};
export default postManagerReducer