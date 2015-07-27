import { Route, DefaultRoute, NotFoundRoute } from "react-router";
import React from "react";

import App from "./public/views/app";
import pageNotFound from "./public/views/404";
import Account from "./public/views/index";
import UsersIndex from "./public/views/users/usersIndex";
import UserPage from "./public/views/users/userPage";
import Counter from "./public/views/counter/index";
import TodoList from "./public/views/todolist/index";
import DoubleCounter from "./public/views/doublecounter/index";
import RedisTest from "./public/views/redistest/index";
export default (
  <Route path='/' handler={App}>
    <DefaultRoute name='account' handler={Account}/>
		<Route name='users' path='users' handler={UsersIndex}/>
		<Route name='userPage' path='users/:id' handler={UserPage}/>
		<NotFoundRoute handler={pageNotFound}/>
		//for testing purposes:
		<Route name='counter' path='counter' handler={Counter} />
		<Route name='todolist' path='todolist' handler={TodoList} />
		<Route name='doublecounter' path='doublecounter' handler={DoubleCounter} />
		<Route name='redistest' path='redistest' handler={RedisTest} />
  </Route>
);