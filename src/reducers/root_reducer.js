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
import tags from './tags'
import child_categories from './child_categories';
import author_news from './author_news';
import approval_news from './approval_news';
import search from './search';
import author_account from './author_account'
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
    tags,
    child_categories,
    author_news,
    approval_news,
    search,
    author_account,
});

export default persistReducer(persistConfig, root_reducer);
