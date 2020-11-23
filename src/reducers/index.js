import {combineReducers} from 'redux'
import session from './session';
import categories from './categories';
import loading from './loading';
const myReducer = combineReducers({
    session,
    categories,
    loading,
});

export default myReducer;