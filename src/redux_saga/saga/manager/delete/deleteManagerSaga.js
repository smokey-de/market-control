import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {deleteManagerError, deleteManagerSuccess} from "../../../action/manager/delete/deleteManagerAction";
import {DELETE_MANAGER_START} from "../../../constants/manager/delete/constants";


export function* deleteManager(data) {
    try {
        const response = yield api.request.post(`/api/manager/delete?managerReportId=${data.payload}`);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(deleteManagerSuccess(response.data))
        }
    } catch (e) {
        yield put(deleteManagerError(e));
    }
}

export function* deleteManagerStart() {
    yield takeEvery(DELETE_MANAGER_START, deleteManager)
}

export function* deleteManagerSaga() {
    yield all([
        fork(deleteManagerStart)
    ])
}