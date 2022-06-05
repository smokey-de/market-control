import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../api/api";
import {GET_MARKET_START} from "../../constants/market/constants";
import {getMarketError, getMarketSuccess} from "../../action/market/marketAction";
import {market} from "../../../api/config";
import {getTypeError, getTypeSuccess} from "../../action/TYPE/typeAction";
import {GET_TYPE_START} from "../../constants/type/costants";


export function* getType() {
    try {
        let response = yield api.request.get(`api/manager/listType`);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(getTypeSuccess(response.data))
        }
    } catch (e) {
        yield put(getTypeError(e));
    }
}

export function* getTypeStart() {
    yield takeEvery(GET_TYPE_START, getType)
}

export function* typeSaga() {
    yield all([
        fork(getTypeStart),
    ])
}
