import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {postManagerError, postManagerSuccess} from "../../../action/manager/post/postManagerAction";
import {SAVE_MANAGER_START} from "../../../constants/manager/post/constants";


export function* postManager(data) {

    try {
        let response
        if (data.nimadur){
             response = yield api.request.get(`api/report/doScheduled`,);
        }else{
             response = yield api.request.post(`api/manager`, data.payload);
        }
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(postManagerSuccess(response.data))
        }
        // if (response.status === 200 && response.data.message.code === 105 || response.status === 200 && response.data.message.code === 2) {
        //     yield put(postManagerError(response.data.message));
        // }
    } catch (e) {
        yield put(postManagerError(e));
    }
}

export function* postManagerStart() {
    yield takeEvery(SAVE_MANAGER_START, postManager)
}

export function* postManagerSaga() {
    yield all([
        fork(postManagerStart)
    ])
}