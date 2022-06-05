import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../api/api";
import {GET_CATEGORY_START} from "../../constants/category/constants";
import {getCategoryError, getCategorySuccess} from "../../action/category/categoryAction";


export function* getCategory() {
    try {
        let response = yield api.request.get(`api/category/list`);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(getCategorySuccess(response.data))
        }
    } catch (e) {
        yield put(getCategoryError(e));
    }
}

export function* getCategoryStart() {
    yield takeEvery(GET_CATEGORY_START, getCategory)
}

export function* categorySaga() {
    yield all([
        fork(getCategoryStart),
    ])
}
