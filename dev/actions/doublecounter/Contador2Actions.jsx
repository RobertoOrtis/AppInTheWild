//import the action types
import	{	INCREMENTAR_CONTADOR_2 } from '../../constants/doublecounter/ActionTypes';

export function incrementar2() {
	console.info("counter2 increment action was invoked.");
	return {
		type: INCREMENTAR_CONTADOR_2
	};
}

/*export function set_value() {
	return {
		type: SET_COUNTER_VALUE_2,
		value
	};
}*/