import {GET_REPORT_ERROR, GET_REPORT_START, GET_REPORT_SUCCESS} from "../../constants/report/constants";

export const getReportStart = (filter, date , val) => {
    return {
        type: GET_REPORT_START,
        val: val,
        date:date,
        filter:filter
    }
};
export const getReportSuccess = (data) => {
    return {
        type: GET_REPORT_SUCCESS,
        payload: data
    }
};
export const getReportError = (e) => {
    return {
        type: GET_REPORT_ERROR,
        payload: e
    }
};