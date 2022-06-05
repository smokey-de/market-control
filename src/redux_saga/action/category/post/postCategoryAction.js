import {
    SAVE_CATEGORY_ERROR,
    SAVE_CATEGORY_START,
    SAVE_CATEGORY_SUCCESS
} from "../../../constants/category/post/constants";


export const postCategoryStart = (val) => {
    return {
        type: SAVE_CATEGORY_START,
        payload: val
    }
};
export const postCategorySuccess = (data) => {
    return {
        type: SAVE_CATEGORY_SUCCESS,
        payload: data
    }
};

export const postCategoryError = (e) => {
    return {
        type: SAVE_CATEGORY_ERROR,
        payload: e
    }
};