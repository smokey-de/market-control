import {SAVE_REPORT_ERROR, SAVE_REPORT_START, SAVE_REPORT_SUCCESS} from "../../../constants/report/post/constants";

const initialState = {
    loading: false,
    success: false,
    message: {},
    error: false
};
const postReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_REPORT_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: {}
            };
        case SAVE_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message
            };
        case SAVE_REPORT_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message
            };
        default:
            return state}
};
export default postReportReducer