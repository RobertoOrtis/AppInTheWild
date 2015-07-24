import React, { Component } from 'react';
import DoubleCounterApp from './DoubleCounterApp';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../../../stores/doublecounter'

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				{() => <DoubleCounterApp /> }
			</Provider>
		);
	}
}