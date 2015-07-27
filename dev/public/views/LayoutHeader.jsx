//Layout Header
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LayoutHeader extends Component {
	render() {
		return (
			<ul>
				<li><a href='/some_unknown'>This is an u nhadled route</a></li>
        <li><Link to='users'>Go to users (handled)</Link></li>
        <li><Link to='counter'>Go to Counter</Link></li>       
        <li><Link to='todolist'>Go to TodoListMVC</Link></li>
        <li><Link to='doublecounter'>Go to DoubleCounter</Link></li>
        <li><Link to='redistest'>Go to RedisTest</Link></li>
			</ul>
			)
	}
}