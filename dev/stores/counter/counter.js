import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../../constants/counter/ActionTypes';

export default function counter(state = 7, action) {
  switch (action.type) {
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}