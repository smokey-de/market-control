import {all, fork, put, takeEvery} from 'redux-saga/effects'
import api from "../../../api/api"
import {GET_PROFILE_DATA_START, LOGIN_START} from "../../constants/constants";
import {Base64} from 'js-base64'
import {auth_login, profile_data} from "../../../api/config";
import {
    getProfileDataError,
    getProfileDataSuccess,
    loginError,
    loginSuccess,
    noFound,
} from "../../action/auth/authAction";

export function* postLogin({payload}) {
    try {
        const response = yield api.request.post(auth_login, {
            ...payload
        });
        if (response.status === 200 && response.data.message.code === 0) {
            localStorage.setItem('BotToken', Base64.encode(response.data.data.accessToken));
            sessionStorage.setItem('BotToken', Base64.encode(response.data.data.refreshToken));
            yield put(loginSuccess(response.data.message));
        }
        if (response.status === 200 && response.data.message.code === 101) {
            yield put(noFound(response.data.message))
        }
    } catch (e) {
        yield put(loginError(e));
    }
}

export function* getProfileData() {
    try {
        const profileData = yield api.request.get(profile_data,);
        if (profileData.status === 200 && profileData.data.message.code === 0) {
            yield put(getProfileDataSuccess(profileData.data));
            localStorage.setItem("Authority", Base64.encode(JSON.stringify(profileData.data)))
            localStorage.setItem("ROLE", Base64.encode(profileData.data.data.role[0].authority))
        }
    } catch (e) {
        yield put(getProfileDataError(e));
    }
}

export function* postLoginStart() {
    yield takeEvery(LOGIN_START, postLogin)
}

export function* getProfileDataStart() {
    yield takeEvery(GET_PROFILE_DATA_START, getProfileData)
}

export function* authSaga() {
    yield all([
        fork(postLoginStart),
        fork(getProfileDataStart)
    ])
}