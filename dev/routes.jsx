import { Route, DefaultRoute, NotFoundRoute } from "react-router";
import React from "react";

import App from "./public/views/app";
import pageNotFound from "./public/views/404";
import Account from "./public/views/index";
import UsersIndex from "./public/views/users/usersIndex";
import UserPage from "./public/views/users/userPage";
export default (
  <Route path='/' handler={App}>
    <DefaultRoute name='account' handler={Account}/>
		<Route name='users' path='users' handler={UsersIndex}/>
		<Route name='userPage' path='users/:id' handler={UserPage}/>
		<NotFoundRoute handler={pageNotFound}/>
  </Route>
);