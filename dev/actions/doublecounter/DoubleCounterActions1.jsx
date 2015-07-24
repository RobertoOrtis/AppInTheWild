//import the action types
import	{	INCREMENT_COUNTER_1	} from '../../constants/doublecounter/ActionTypes';

export function increment1() {
	console.info("counter1 increment action was invoked.");
	return {
		type: INCREMENT_COUNTER_1
	};
}