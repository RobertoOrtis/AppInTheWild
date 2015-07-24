import { INCREMENT_COUNTER_1 } from '../../constants/doublecounter/ActionTypes';

//const initialState = 0;

export default function counter( state = 2, action) {
	switch (action.type) {
		case INCREMENT_COUNTER_1:
		  //console.info("counter1 ack ${event.type}: event =", event);
			return state + 1;
		
		default:
     // console.warn("counter1 ack unknown event: state =", state, "event =", event);
      return state;
	}
}						 