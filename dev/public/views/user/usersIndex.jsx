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
        <h6>Welcome to my Users Page!</h6>
        
        <br />
        <br />
        <Link to='/user/123'>Go to User 123</Link>
        <br />
        <br />
        <Link to='/'>go home</Link>
      </div>
    );
  }
});