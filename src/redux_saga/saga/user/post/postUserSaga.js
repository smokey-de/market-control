import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {userPost} from "../../../../api/config";
import {postUserError, postUserSuccess} from "../../../action/user/post/postUserAction";
import {SAVE_USER_START} from "../../../constants/user/post/constants";


export function* postUser({payload}) {
    try {
        const response = yield api.request.post(userPost, payload);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(postUserSuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 105 || response.status === 200 && response.data.message.code === 2) {
            yield put(postUserError(response.data.message));
        }
    } catch (e) {
        yield put(postUserError(e));
    }
}

export function* postUserStart() {
    yield takeEvery(SAVE_USER_START, postUser)
}

export function* postUserSaga() {
    yield all([
        fork(postUserStart)
    ])
}