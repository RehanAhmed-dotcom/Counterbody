import {combineReducers} from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import paymentReducer from './paymentReducer';
import darkReduser from './darkReduser';
export default combineReducers({
  USER: userReducer,
  APP: appReducer,
  PAY:paymentReducer,
  DARK:darkReduser,
});
