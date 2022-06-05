import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {SAVE_MARKET_START} from "../../../constants/market/post/constants";
import {postMarketError, postMarketSuccess} from "../../../action/market/post/postMarketAction";
import {marketPostApi} from "../../../../api/config";


export function* postMarket({payload}) {
    // debugger
    try {
        const response = yield api.request.post(marketPostApi, payload);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(postMarketSuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 1 || response.status === 200 && response.data.message.code === 2) {
            yield put(postMarketError(response.data.message));
        }
    } catch (e) {
        yield put(postMarketError(e));
    }
}

export function* postMarketStart() {
    yield takeEvery(SAVE_MARKET_START, postMarket)
}

export function* postMarketSaga() {
    yield all([
        fork(postMarketStart)
    ])
}