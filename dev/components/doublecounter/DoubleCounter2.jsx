import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as counter2Actions from '../../actions/doublecounter/DoubleCounterActions2';

@connect( state => ({
	counter2: state.counter2
}))

export default class DoubleCounter2 {
	//specify propTypes
	static propTypes = {
		counter2: React.PropTypes.number.isRequired
	}

	componentDidMount() {
		console.info("counter 2 component did mount.");
	}

	onClick() {
		console.info("counter 2 button was click.")
		const action = bindActionCreators(counter2Actions, this.props.dispatch);
		action.increment();
	}

	render() {
		return (
			<div>
				<h1>Counter</h1>
				<button onClick={::this.onClick}>increment</button>
				<div>Total: <span>{this.props.counter2}</span></div>
			</div>
		);
	}
}