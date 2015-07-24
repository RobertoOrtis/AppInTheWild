import {
							INCREMENT_COUNTER_2,
							SET_COUNTER_VALUE_2
						 }
						 from '../../constants/doublecounter/ActionTypes';

const initialState = 0;

export default function counter( state = initialState, action) {
	switch (action.type) {
		case INCREMENT_COUNTER_2:
		  console.info(`counter2 ack ${event.type}: event =`, event);
			return state + 1;
		
		case SET_COUNTER_VALUE_2:
			return action.value;

		default:
      console.warn("counter2 ack unknown event: state =", state, "event =", event);
      return state;
	}
}						 