import { createStore, compose, applyMiddleware } from "redux";
import {persistStore} from 'redux-persist'
import thunk from "redux-thunk";

import root_reducer from "./root_reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  root_reducer,
  composeEnhancer(applyMiddleware(thunk))
);
export const persistor = persistStore(store);

export default {store, persistor};