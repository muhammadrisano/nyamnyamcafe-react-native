import { combineReducers } from 'redux';
import users from './users';
import items from './items';
import carts from './carts';
import payments from './payments';
import categorys from './categorys'
const appReducer = combineReducers({
    users,
    items,
    carts,
    payments,
    categorys
});

export default appReducer;