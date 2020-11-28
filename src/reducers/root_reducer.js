import {combineReducers} from 'redux'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import session from './session';
import categories from './categories';
import loading from './loading';
import message from './message';
import parent_categories from './parent_categories';
import category_detail from './category_detail';
import error from './error';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const root_reducer = combineReducers({
    session,
    categories,
    parent_categories,
    category_detail,
    loading,
    message,
    error,
});

export default persistReducer(persistConfig, root_reducer);