import React, { Component, PropTypes } from 'react';

export default class DoubleCounter1 extends Component {
	//specify propTypes
	static propTypes = {
		increment1: PropTypes.func.isRequired,
		counter1: PropTypes.number.isRequired
	}
	
	componentDidMount() {
		console.info("counter 1 component did mount.");
	}


	render() {
		const { increment1, counter1 } = this.props;
		return (
			<div>
				<h1>Counter</h1>
				<button onClick={increment1}>increment</button>
				<div>Total: (<span>{counter1}</span>) times</div>

			</div>
		);
	}
}