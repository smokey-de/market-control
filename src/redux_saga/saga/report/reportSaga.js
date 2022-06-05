import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../api/api";
import {GET_REPORT_START} from "../../constants/report/constants";
import {getReportError, getReportSuccess} from "../../action/report/reportAction";
import {report} from "../../../api/config";


export function* getReport(data) {
    try {
        let response
        if(data.filter){
            response = yield api.request.post(`api/report/filter` , data.val);
        }else {
            response = yield api.request.post(`api/report/list/reports` , data.date);
        }
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(getReportSuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 116) {
            yield put(getReportError(response.data.message))
        }
        if (response.status === 200 && response.data.message.code === 7) {
            yield put(getReportError(response.data.message))
        }
    } catch (e) {
        yield put(getReportError(e));
    }
}

export function* getReportStart() {
    yield takeEvery(GET_REPORT_START, getReport)
}

export function* reportSaga() {
    yield all([
        fork(getReportStart),
    ])
}
