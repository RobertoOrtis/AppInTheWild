import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DoubleCounter1 from '../../../components/doublecounter/Contador';
import DoubleCounter2 from '../../../components/doublecounter/Contador2';

import * as Counter1Actions from '../../../actions/doublecounter/ContadorActions';
import * as Counter2Actions from '../../../actions/doublecounter/Contador2Actions';

@connect(state => ({
  contador2: state.contador2,
  contador: state.contador
}))

export default class DoubleCounterApp extends Component {
	render() {
		const { contador2, contador, dispatch } = this.props;
		return (
			<div>
		 <DoubleCounter1 contador={contador}
               {...bindActionCreators(Counter1Actions, dispatch)} />
     <DoubleCounter2 contador2={contador2}
               {...bindActionCreators(Counter2Actions, dispatch)} />
			</div>
		);
	}
}