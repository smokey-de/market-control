import {all, fork, put, takeEvery} from "redux-saga/effects"
import api from "../../../../api/api";
import {postCategoryError, postCategorySuccess} from "../../../action/category/post/postCategoryAction";
import {SAVE_CATEGORY_START} from "../../../constants/category/post/constants";
import {category} from "../../../../api/config";


export function* postCategory({payload}) {
    try {
        const response = yield api.request.post(category, payload);
        if (response.status === 200 && response.data.message.code === 0) {
            yield put(postCategorySuccess(response.data))
        }
        if (response.status === 200 && response.data.message.code === 1 ) {
            yield put(postCategoryError(response.data.message));
        }
    } catch (e) {
        yield put(postCategoryError(e));
    }
}

export function* postCategoryStart() {
    yield takeEvery(SAVE_CATEGORY_START, postCategory)
}

export function* postCategorySaga() {
    yield all([
        fork(postCategoryStart)
    ])
}