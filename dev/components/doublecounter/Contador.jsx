import React, { Component, PropTypes } from 'react';

export default class DoubleCounter1 extends Component {
	//specify propTypes
	static propTypes = {
		incrementar: PropTypes.func.isRequired,
		contador: PropTypes.number.isRequired
	};
	
	componentDidMount() {
		console.info("counter 1 component did mount.");
	}

	render() {
		const { incrementar, contador } = this.props;
		return (
			<div>
				<h1>Counter</h1>
				<button onClick={incrementar}>increment</button>
				<div>Total: (<span>{contador}</span>) times</div>

			</div>
		);
	};
}