import Layout from './layout';
import React from 'react';
import Router from 'react-router';

class AppView extends React.Component{

  render() {

    return (
      <Layout {...this.props}>
        <Router.RouteHandler {...this.props}/>
      </Layout>
    );
  }
}
module.exports = AppView;