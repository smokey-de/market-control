import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../api/api";
import {GET_MARKET_START} from "../../constants/market/constants";
import {getMarketError, getMarketSuccess} from "../../action/market/marketAction";
import {market} from "../../../api/config";


export function* getMarket() {
    try {
        let response = yield api.request.get(market);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(getMarketSuccess(response.data))
        }
    } catch (e) {
        yield put(getMarketError(e));
    }
}

export function* getMarketStart() {
    yield takeEvery(GET_MARKET_START, getMarket)
}

export function* marketSaga() {
    yield all([
        fork(getMarketStart),
    ])
}
