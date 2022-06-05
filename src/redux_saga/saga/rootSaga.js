import {call, all} from 'redux-saga/effects'
import {authSaga} from "./auth/authSaga";
import {marketSaga} from "./market/marketSaga";
import {postMarketSaga} from "./market/post/postMarketSaga";
import {userSaga} from "./user/userSaga";
import {deleteUserSaga} from "./user/delete/deleteUserSaga";
import {roleSaga} from "./role/roleSaga";
import {postConnectSaga} from "./market/connect/connectSaga";
import {deleteMarketSaga} from "./market/delete/deleteMarketSaga";
import {reportSaga} from "./report/reportSaga";
import {postUserSaga} from "./user/post/postUserSaga";
import {postReportSaga} from "./report/post/postReportSaga";
import {managerSaga} from "./manager/managerSaga";
import {postManagerSaga} from "./manager/post/postManagerSaga";
import {deleteManagerSaga} from "./manager/delete/deleteManagerSaga";
import {typeSaga} from "./type/typeSaga";
import {categorySaga} from "./category/categorySaga";
import {postCategorySaga} from "./category/post/postCategorySaga";

export default function* rootSaga() {
    yield all([
        call(authSaga),

        call(marketSaga),
        call(postMarketSaga),
        call(postConnectSaga),
        call(deleteMarketSaga),

        call(userSaga),
        call(deleteUserSaga),
        call(postUserSaga),

        call(roleSaga),

        call(reportSaga),
        call(postReportSaga),
        
        call(managerSaga),
        call(postManagerSaga),
        call(deleteManagerSaga),

        call(typeSaga),

        call(categorySaga),
        call(postCategorySaga)
    ])
}