//import the action types
import	{	INCREMENT_COUNTER_2,
					SET_COUNTER_VALUE_2, 
				} 
				from '../../constants/doublecounter/ActionTypes';

export function increment() {
	return {
		type: INCREMENT_COUNTER_2
	};
}

export function set_value() {
	return {
		type: SET_COUNTER_VALUE_2,
		value
	};
}