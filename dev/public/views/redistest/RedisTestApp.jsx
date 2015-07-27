import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*import DoubleCounter1 from '../../../components/doublecounter/Contador';
import DoubleCounter2 from '../../../components/doublecounter/Contador2';

import * as Counter1Actions from '../../../actions/doublecounter/ContadorActions';
import * as Counter2Actions from '../../../actions/doublecounter/Contador2Actions';

@connect(state => ({
  contador2: state.contador2,
  contador: state.contador
}))
*/
export default class RedisTestApp extends Component {

	render() {
		return (
			<div>
				This is a Redis Test!
			</div>
		);
	}
}