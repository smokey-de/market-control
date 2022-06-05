import {
    DELETE_MANAGER_ERROR,
    DELETE_MANAGER_START,
    DELETE_MANAGER_SUCCESS
} from "../../../constants/manager/delete/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false
};
const deleteManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_MANAGER_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case DELETE_MANAGER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case DELETE_MANAGER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state}
};
export default deleteManagerReducer