import {
    SAVE_CATEGORY_ERROR,
    SAVE_CATEGORY_START,
    SAVE_CATEGORY_SUCCESS
} from "../../../constants/category/post/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false
};
const postCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CATEGORY_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case SAVE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case SAVE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state
    }
};
export default postCategoryReducer