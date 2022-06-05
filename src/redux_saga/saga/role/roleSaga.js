import {all, fork, put, takeEvery} from 'redux-saga/effects'
import api from "../../../api/api";
import {getRoleError, getRoleSuccess} from "../../action/role/roleAction";
import {GET_ROLE_START} from "../../constants/role/constants";
import {role} from "../../../api/config";


export function* getRole() {
    try {
        const response = yield api.request.get(role);
        yield put(getRoleSuccess(response.data))
    } catch (e) {
        yield put(getRoleError(e));
    }
}

export function* getRoleStart() {
    yield takeEvery(GET_ROLE_START, getRole)
}

export function* roleSaga() {
    yield all([
        fork(getRoleStart)
    ])
}