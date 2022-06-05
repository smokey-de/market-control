import {SAVE_REPORT_ERROR, SAVE_REPORT_START, SAVE_REPORT_SUCCESS} from "../../../constants/report/post/constants";

export const postReportStart = (val) => {
    return {
        type: SAVE_REPORT_START,
        payload: val
    }
};
export const postReportSuccess = (data) => {
    return {
        type: SAVE_REPORT_SUCCESS,
        payload: data
    }
};
export const postReportError = (e) => {
    return {
        type: SAVE_REPORT_ERROR,
        payload: e
    }
};