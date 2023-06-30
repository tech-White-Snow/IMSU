import { createStore, combineReducers, applyMiddleware  } from 'redux';

import userReducer from './userReducer';
import thunk from 'redux-thunk';
import myInfor from './myInfor';
import transactionReducer from './transactionReducer';
import modalReducer from './modalReducer';
import customerReducer from './customerReducer';

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
  myInfor,
  modal: modalReducer,
  customers: customerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;