import { Meteor } from "meteor/meteor";
import React, {Component, PropTypes} from "react";
import {Router, Route, Redirect, browserHistory} from "react-router";
import { Accounts } from "meteor/accounts-base";

import Layout from "./ui/containers/Layout/index";
import PermissionDenied from "./ui/pages/PermissionDenied/index";
import NotFound from "./ui/pages/NotFound/index";
import AuthRegister from "./ui/pages/AuthRegister/index";
import {UserSingle, UsersList} from "./ui/pages/Users/index";
import {GeneralChat} from "./ui/pages/Chat/index";

const checkAccess = (nextState, replace, next) => {
	let user = Meteor.user();
	let route = nextState.routes[nextState.routes.length - 1];
	let routePath = route.path;

	if (user && routePath == "auth") {
		replace('/');
	}
	if (!user && routePath !== "auth") {
		replace("auth");
	}

	//console.log("routes.checkAccess, user:", user);
	next();
};

export default () => (
	<Router history={browserHistory}>
		<Redirect from="/" to="users"/>
		<Route path="/" component={Layout}>
			<Route path="users" component={UsersList} onEnter={checkAccess}/>
			<Route path="users/:user_id" component={UserSingle} onEnter={checkAccess}/>
			<Route path="chat" component={GeneralChat} onEnter={checkAccess}/>
			<Route path="auth" component={AuthRegister} onEnter={checkAccess}/>
			<Route path="403" component={PermissionDenied}/>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
);