import React, {Component} from "react";
import { Accounts } from "meteor/accounts-base";

const config = require('../../../config/app.conf.json');

export default class Header extends Component {

	componentDidMount() {
		document.body.classList.add('fixed-header');
	}

	_handleClickLogout(e) {
		e.preventDefault();
		Accounts.logout(() => this.context.router.push('/auth'));
	}

	render() {
		return (<div className="navbar navbar-inverse navbar-fixed-top">
			<div className="container-fluid">
				<a href="/" className="navbar-brand">
					{config.client.logoText}
				</a>

				<div className="pull-right" style={{padding: '15px 0'}}>
					<a href="/auth" onClick={this._handleClickLogout.bind(this)} className="btn btn-xs btn-primary">
						Logout
					</a>
				</div>
			</div>
		</div>);
	}
}

Header.contextTypes = {
	router: function () {
	}
};