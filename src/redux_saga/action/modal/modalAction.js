import {
    MODAL_FALSE,
    MODAL_TRUE
} from "../../constants/modal/constants";

export const modalTrue = () => {
    return {
        type: MODAL_TRUE
    }
};
export const modalFalse = () => {
    return {
        type: MODAL_FALSE
    }
};