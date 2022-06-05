import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    GET_PROFILE_DATA_SUCCESS,
    GET_PROFILE_DATA_START, NO_FOUND, TRUE_FOUND
} from '../../constants/constants'

const initialState = {
    loading: false,
    success: false,
    data: '',
    status: {},
    profileData: {},
    error: false,
    userId: 0
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                data: '',
                status: {}
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                // success: true,
                data: action.payload,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
                status: action.payload.message
            };
        case NO_FOUND:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
                status: action.payload
            };
        case GET_PROFILE_DATA_START:
            return {
                ...state,
                profileData: {}
            };
        case GET_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                success: false,
                profileData: action.payload.message,
                userId: action.payload.data.username
            };
        default:
            return state
    }
};
export default authReducer