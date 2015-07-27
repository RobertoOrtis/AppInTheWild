import React, { Component, PropTypes } from 'react';
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';

//import * as counter2Actions from '../../actions/doublecounter/Contador2Actions';


export default class DoubleCounter2 extends Component {
	//specify propTypes
	static propTypes = {
		contador2: PropTypes.number.isRequired,
		incrementar2: PropTypes.func.isRequired
	}

	componentDidMount() {
		console.info("counter 2 component did mount.");
	}
/*
	onClick() {
		console.info("counter 2 button was click.")
		const action = bindActionCreators(counter2Actions, this.props.dispatch);
		action.increment();
	}
*/
	render() {
		const { incrementar2, contador2 } = this.props;
		return (
			<div>
				<h1>Counter</h1>
				<button onClick={incrementar2}>increment</button>
				<div>Total: (<span>{contador2}</span>)</div>
			</div>
		);
	}
}