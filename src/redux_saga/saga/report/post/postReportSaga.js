import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {postReportError, postReportSuccess} from "../../../action/report/post/postReportAction";
import {SAVE_REPORT_START} from "../../../constants/report/post/constants";
import {reportPost} from "../../../../api/config";


export function* postReport({payload}) {
    try {
        const response = yield api.request.post(reportPost, payload);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(postReportSuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 116) {
            yield put(postReportError(response.data.message));
        }
    } catch (e) {
        yield put(postReportError(e));
    }
}

export function* postReportStart() {
    yield takeEvery(SAVE_REPORT_START, postReport)
}

export function* postReportSaga() {
    yield all([
        fork(postReportStart)
    ])
}