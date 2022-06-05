import {
    MODAL_FALSE,
    MODAL_TRUE
} from "../../constants/modal/constants";

const initialState = {
    visible: false,
    exp: false,
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_TRUE:
            return {
                visible: true
            };
        case MODAL_FALSE:
            return {
                visible: false
            };
        default:
            return state
    }};
export default modalReducer