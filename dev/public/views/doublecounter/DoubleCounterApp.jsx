import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DoubleCounter1 from '../../../components/doublecounter/DoubleCounter1';
//import DoubleCounter2 from '../../../components/doublecounter/DoubleCounter2';

import * as Counter1Actions from '../../../actions/doublecounter/DoubleCounterActions1';

@connect(state => ({
  counter1: state.counter1
}))

export default class DoubleCounterApp extends Component {
	render() {
		const { counter1, dispatch } = this.props;
		return (
			<div>
      <DoubleCounter1 counter1={counter1}
               {...bindActionCreators(Counter1Actions, dispatch)} />
			</div>
		);
	}
}