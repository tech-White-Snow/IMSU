import { createStore, combineReducers, applyMiddleware  } from 'redux';

import userReducer from './userReducer';
import thunk from 'redux-thunk';
import myInfor from './myInfor';
import transactionReducer from './transactionReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
  myInfor,
  modal: modalReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;