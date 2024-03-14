import {ActionType} from '../actions';
const InitialState = {
  darkmd: false,
};

export default (state = InitialState, {type, payload}) => {
  switch (type) {
    case ActionType.DARKMODE: {
      return {
        ...state,
        darkmd: {payload},
      };
    }
    default:
      return state;
  }
};
