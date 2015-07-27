//import the action types
//import	{	INCREMENTAR_CONTADOR	} from '../../constants/doublecounter/ActionTypes';

export function incrementar() {
	console.info("counter1 increment action was invoked.");
	return {
		type: "INCREMENTAR_CONTADOR"
	};
}