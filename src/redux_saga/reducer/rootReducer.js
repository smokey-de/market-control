import {combineReducers} from "redux"
import authReducer from "./auth/authReducer";
import marketReducer from "./market/marketReducer";
import modalReducer from "./modal/modalReducer";
import postMarketReducer from "./market/post/postMarketReducer";
import userReducer from "./user/userReducer";
import deleteUserReducer from "./user/delete/deleteUserReducer";
import roleReducer from "./role/roleReducer";
import postConnectReducer from "./market/connect/connectReducer";
import deleteMarketReducer from "./market/delete/deleteMarketReducer";
import reportReducer from "./report/reportReducer";
import postUserReducer from "./user/post/postUserReducer";
import postReportReducer from "./report/post/postReportReducer";
import managerReducer from "./manager/managerReducer";
import postManagerReducer from "./manager/post/postManagerReducer";
import deleteManagerReducer from "./manager/delete/deleteManagerReducer";
import typeReducer from "./type/typeReducer";
import categoryReducer from "./category/categoryReducer";
import postCategoryReducer from "./category/post/postCategoryReducer";

export const rootReducer = combineReducers({
    auth: authReducer,

    modal: modalReducer,

    market: marketReducer,
    postMarket: postMarketReducer,
    postConnect:postConnectReducer,
    deleteMarket:deleteMarketReducer,

    user:userReducer,
    deleteUser:deleteUserReducer,
    postUser:postUserReducer,

    role:roleReducer,

    report:reportReducer,
    postReport:postReportReducer,

    manager:managerReducer,
    postManager: postManagerReducer,
    deleteManager:deleteManagerReducer,

    type: typeReducer,

    category: categoryReducer,
    postCategory: postCategoryReducer
});