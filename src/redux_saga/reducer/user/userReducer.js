import {GET_USER_ERROR, GET_USER_START, GET_USER_SUCCESS} from "../../constants/user/constants";


const initialState = {
    loading: false,
    success: false,
    data: [],
    error: false,
    message: {}
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                data: [],
                message: {}
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data:action.payload.data
            };
        case GET_USER_ERROR:
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
};export default userReducer