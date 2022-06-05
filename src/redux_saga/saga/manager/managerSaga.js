import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../api/api";
import {getManagerError, getManagerSuccess} from "../../action/manager/managerAction";
import {GET_MANAGER_START} from "../../constants/manager/constants";


export function* getManager(data) {
    try {
        let response
        if(data.filter){
            response = yield api.request.post(`/api/manager/filter` , data.val);
        }else {
            response = yield api.request.get(`api/manager/list`);
        }
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(getManagerSuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 116) {
            yield put(getManagerError(response.data.message))
        }
    } catch (e) {
        yield put(getManagerError(e));
    }
}

export function* getManagerStart() {
    yield takeEvery(GET_MANAGER_START, getManager)
}

export function* managerSaga() {
    yield all([
        fork(getManagerStart),
    ])
}
