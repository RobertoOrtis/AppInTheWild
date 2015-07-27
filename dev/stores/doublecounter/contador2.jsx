import { INCREMENTAR_CONTADOR_2 } from '../../constants/doublecounter/ActionTypes';

const initialState = 0;

export default function contador2( state = initialState, action) {
	switch (action.type) {
		case INCREMENTAR_CONTADOR_2:
		  console.info("counter2 ack ${event.type}: event =", action);
		  console.info("state before return=",state)
			return state + 1;
		/*
		case SET_COUNTER_VALUE_2:
			return action.value;
*/
		default:
      console.warn("counter2 ack unknown event: state =", state, "action =", action);
      return state;
	}
}						 