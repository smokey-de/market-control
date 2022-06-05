import {
    GET_ROLE_ERROR,
    GET_ROLE_START,
    GET_ROLE_SUCCESS
} from "../../constants/role/constants";const initialState = {
    loading: false,
    success: false,
    data: [],
    error: false,
    message: {}
};
const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ROLE_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                data: [],
                message: {}
            };
        case GET_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload.data,};
        case GET_ROLE_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state
    }
};export default roleReducer
