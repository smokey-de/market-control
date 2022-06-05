import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../api/api";
import {getUserError, getUserSuccess} from "../../action/user/userAction";
import {GET_USER_START} from "../../constants/user/constants";
import {user} from "../../../api/config";


export function* getUser() {
    try {
        let response = yield api.request.get(user);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(getUserSuccess(response.data))
        }
    } catch (e) {
        yield put(getUserError(e));
    }
}

export function* getUserStart() {
    yield takeEvery(GET_USER_START, getUser)
}

export function* userSaga() {
    yield all([
        fork(getUserStart),
    ])
}
