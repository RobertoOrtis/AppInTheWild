import React from 'react'
import { Link } from 'react-router'

class IndexView extends React.Component{

  displayName: 'account'

  onButtonClick() {
    alert('Happy Reacting!')
  }

  render() {

    return (
      <div id='account'>
        <h1>{this.props.name}</h1>
        <h6>Welcome to my Base ReactJS app!</h6>
        <button onClick={this.onButtonClick}>Click me for some fun...</button>
        <br />
        <br />
        <a href='/some_unknown'>This is an u nhadled route</a>
        <br />
        <br />
        <Link to='user'>Go to users (handled)</Link>
        <br />
        <br />
        <Link to='counter'>Go to Counter</Link>
        <br />
        <br />
        <Link to='todolist'>Go to TodoListMVC</Link>
        <br />
        <br />
        <Link to='doublecounter'>Go to DoubleCounter</Link>
      </div>
    );
  }
}
module.exports = IndexView;