import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {deleteMarketError, deleteMarketSuccess} from "../../../action/market/delete/deleteMarketAction";
import {DELETE_MARKET_START} from "../../../constants/market/delete/constants";
import {marketDelete} from "../../../../api/config";


export function* deleteMarket(data) {
    try {
        let response
            response = yield api.request.post(`/api/report/delete/${data.payload}`);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(deleteMarketSuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 122) {
            yield put(deleteMarketError(response.data.message));
        }
    } catch (e) {
        yield put(deleteMarketError(e));
    }
}

export function* deleteMarketStart() {
    yield takeEvery(DELETE_MARKET_START, deleteMarket)
}

export function* deleteMarketSaga() {
    yield all([
        fork(deleteMarketStart)
    ])
}