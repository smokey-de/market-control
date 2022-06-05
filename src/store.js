import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./redux_saga/saga/rootSaga";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "./redux_saga/reducer/rootReducer";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);
