var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({

  displayName: 'account',

  onButtonClick: function() {
    alert('Happy Reacting!');
  },

  render: function render() {

    return (
      <div id='account'>
        <h1>{this.props.name}</h1>
        <h6>Welcome to my Users ID: {this.props.params.id} Page!</h6>
        
        <br />
        <Link to='users'>go to users</Link>
        <br />
        <Link to='/'>go back home</Link>

      </div>
    );
  }
});