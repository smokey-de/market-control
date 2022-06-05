import {GET_MANAGER_ERROR, GET_MANAGER_START, GET_MANAGER_SUCCESS} from "../../constants/manager/constants";
import {act} from "@testing-library/react";


const initialState = {
    loading: false,
    success: false,
    data: [],
    error: false,
    message: {},
    rasxod: 0,
    prixod:0
};
const managerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MANAGER_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                data: [],
                message: {},
            };
        case GET_MANAGER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data:action.payload.data.list,
                total: action.payload.data.summa,
                rasxod: action.payload.data.rasxod,
                prixod: action.payload.data.prixod
            };
        case GET_MANAGER_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
                message: action.payload.code ? action.payload : action.payload.message,
            };
        default:
            return state
    }
};export default managerReducer