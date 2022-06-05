import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {postConnectError, postConnectSuccess} from "../../../action/market/connect/connectAction";
import {SAVE_CONNECT_START} from "../../../constants/market/conect/constants";


export function* postConnect(data) {
    try {
        const response = yield api.request.post(`api/market/connectUser?userId=${data.userId}&marketId=${data.marketId}`);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(postConnectSuccess(response.data))
        }
    } catch (e) {
        yield put(postConnectError(e));
    }
}

export function* postConnectStart() {
    yield takeEvery(SAVE_CONNECT_START, postConnect)
}

export function* postConnectSaga() {
    yield all([
        fork(postConnectStart)
    ])
}