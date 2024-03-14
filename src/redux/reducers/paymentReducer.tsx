import {ActionType} from '../actions';
const InitialState = {
  userpayment: {},
};

export default (state = InitialState, {type, payload}) => {
  switch (type) {
    case ActionType.UPDATEPAYMENT: {
      return {
        ...state,
        userpayment: {...payload},
      };
    }
    case ActionType.UPDATEPAYMENT_LOGOUT: {
         return InitialState;
      }
 
    default:
      return state;
  }
};
