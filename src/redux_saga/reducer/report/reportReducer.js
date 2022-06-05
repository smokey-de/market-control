import {GET_REPORT_ERROR, GET_REPORT_START, GET_REPORT_SUCCESS} from "../../constants/report/constants";


const initialState = {
    loading: false,
    success: false,
    data: [],
    error: false,
    message: {},
    avans_naqd_sum: 0,
    avans_tovar_sum: 0,
    boshqa_rasxod_sum: 0,
    inkassatsiya: 0,
    terminal_sum: 0,
    ras_firma_naqd_sum: 0,
    ostatok_dnya_sum: 0,
    naqd_sum: 0
};
const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORT_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                data: [],
                message: {},
                avans_naqd_sum: 0,
                avans_tovar_sum: 0,
                naqd_sum: 0,
                inkassatsiya: 0,
                terminal_sum: 0,
                ras_firma_naqd_sum: 0,
                ostatok_dnya_sum: 0,
                boshqa_rasxod_sum: 0
            };
        case GET_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                avans_naqd_sum: action.payload.data.avans_naqd_sum,
                avans_tovar_sum: action.payload.data.avans_tovar_sum,
                naqd_sum: action.payload.data.naqd_sum,
                boshqa_rasxod_sum: action.payload.data.boshqa_rasxod_sum,
                inkassatsiya: action.payload.data.inkassatsiya,
                ostatok_dnya_sum: action.payload.data.ostatok_dnya_sum,
                ras_firma_naqd_sum: action.payload.data.ras_firma_naqd_sum,
                terminal_sum: action.payload.data.terminal_sum,
                data: action.payload.data.data ? action.payload.data.data : action.payload.data
            };
        case GET_REPORT_ERROR:
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
};export default reportReducer