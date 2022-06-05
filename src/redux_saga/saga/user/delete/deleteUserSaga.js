import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {SAVE_MARKET_START} from "../../../constants/market/post/constants";
import {postMarketError, postMarketSuccess} from "../../../action/market/post/postMarketAction";
import {marketPostApi, userActive, userDelete} from "../../../../api/config";
import {
    activeUserError,
    activeUserSuccess,
    deleteUserError,
    deleteUserSuccess
} from "../../../action/user/delete/deleteUserAction";
import {DELETE_USER_START} from "../../../constants/user/delete/constants";
import {GET_USER_ACTIVE_START} from "../../../constants/user/constants";


export function* deleteUser(data) {

    try {
        let response
        if(data.report){
            response = yield api.request.get(`/api/report/confirm/${data.rep}`,);
        }else{
            response = yield api.request.post(`api/profile/delete/${data.id}`,);
        }
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(deleteUserSuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 1) {
            yield put(deleteUserError(response.data.message));
        }
        if (response.status === 200 && response.data.message.code === 105) {
            yield put(deleteUserError(response.data.message));
        }
    } catch (e) {
        yield put(deleteUserError(e));
    }
}

export function* activeUser({payload}) {
    try {
        const response = yield api.request.post(userActive +  payload,);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(activeUserSuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 1) {
            yield put(activeUserError(response.data.message));
        }
    } catch (e) {
        yield put(activeUserError(e));
    }
}

export function* deleteUserStart() {
    yield takeEvery(DELETE_USER_START, deleteUser)
}

export function* activeUserStart() {
    yield takeEvery(GET_USER_ACTIVE_START, activeUser)
}

export function* deleteUserSaga() {
    yield all([
        fork(deleteUserStart),
        fork(activeUserStart)
    ])
}