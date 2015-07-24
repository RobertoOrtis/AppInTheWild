import React, { Component } from 'react';
//var Link = require('react-router').Link;
import { Link } from 'react-router';
import Counter from '../counter/index'

export default class UserPage extends Component {

  render() {

    return (
      <div id='account'>
        <h1>{this.props.name}</h1>
        <h6>Welcome to my Users ID: {this.props.params.id} Page!</h6>
        
        <br />
        <Link to='users'>go to users</Link>
        <br />
        <Link to='/'>go back home</Link>
        <Counter />
      </div>
    );
  }

}