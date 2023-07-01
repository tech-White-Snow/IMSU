import { createStore, combineReducers, applyMiddleware  } from 'redux';

import userReducer from './userReducer';
import thunk from 'redux-thunk';
import MyInfor from './MyInfor';
import transactionReducer from './transactionReducer';
import customerReducer from './customerReducer';
import modalReducer from './modal';

const rootReducer = combineReducers({
  users: userReducer,
  transactions: transactionReducer,
  MyInfor,
  customers: customerReducer,
  modal: modalReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;