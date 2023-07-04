import { createStore, combineReducers, applyMiddleware , compose } from 'redux';

import userReducer from './userReducer';
import thunk from 'redux-thunk';
import MyInfor from './MyInfor';
import transactionReducer from './transactionReducer';
import customerReducer from './customerReducer';
import modalReducer from './modal';
import Alerts from './Alert';

const rootReducer = combineReducers({
  users: userReducer,
  transactions: transactionReducer,
  MyInfor,
  customers: customerReducer,
  modal: modalReducer,
  Alerts,
});
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ));

export default store;