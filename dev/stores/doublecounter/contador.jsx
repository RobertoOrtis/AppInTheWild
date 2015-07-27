import { INCREMENTAR_CONTADOR } from '../../constants/doublecounter/ActionTypes';

const initialState = 0;

export default function contador( state = initialState, action) {
	switch (action.type) {
		case INCREMENTAR_CONTADOR:
		  console.info("counter1 ack ${event.type}: event =", action);
			return state + 1;
		
		default:
      console.warn("counter1 ack unknown event: state =", state, "event =", action);
      return state;
	}
}						 