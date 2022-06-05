import {GET_CATEGORY_ERROR, GET_CATEGORY_START, GET_CATEGORY_SUCCESS} from "../../constants/category/constants";


const initialState = {
    loading: false,
    success: false,
    data: [],
    error: false,
    message: {}
};
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                data: [],
                message: {}
            };
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data:action.payload.data,
                total: action.payload.data.summa,
            };
        case GET_CATEGORY_ERROR:
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
};export default categoryReducer