import React, { Component } from 'react';
import TodoApp from './TodoApp';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../../../stores/todolist';

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);
//const redux = createRedux(stores);

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				{() => <TodoApp />}
			</Provider>
		);
	}
}