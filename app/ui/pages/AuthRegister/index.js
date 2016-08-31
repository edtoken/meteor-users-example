import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";

import React, {Component} from "react";
import {Form} from "../../components/Form/index";

export class AuthRegister extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isFetching: false,
			errorText: "",
			showRegister: false
		};
	}

	componentDidMount() {
		document.body.classList.add("page-init");
	}

	componentWillUnmount() {
		document.body.classList.remove("page-init");
	}

	_getState(data) {
		return Object.assign({
			isFetching: false,
			errorText: ""
		}, data);
	}

	_handleToggleRegister() {
		this.setState(this._getState({showRegister: !this.state.showRegister}));
	}

	_handleRegister(err, data) {

		this.setState(this._getState({isFetching: true}));

		Accounts.createUser(data, (err) => {
			if (err) {
				return this.setState(this._getState({errorText: err.reason}));
			}
			// todo
			this.context.router.push('/');
		});

	}

	_handleLogin(err, data) {

		this.setState(this._getState({isFetching: true}));

		if (!err) {
			Meteor.loginWithPassword(data.email, data.password, (error) => {
				if (error) {
					return this.setState(this._getState({errorText: error.reason}));
				}
				this.context.router.push('/');
			});
		}
	}

	render() {
		let {showRegister, errorText, isFetching} = this.state;

		let fields = [
			{name: "email", _size: 1},
			{name: "password", type: "password", _size: 1}
		];

		let actions = (showRegister) ? [
			{type: "submit", label: "Register"}
		] : [
			{type: "submit", label: "Sign In"}
		];

		let bottomFormStyle = {textAlign: "right"};
		let bottomButtonProps = {
			className: "btn btn-xs btn-"
		};

		if (isFetching) {
			bottomButtonProps.className += "disabled";
			bottomButtonProps.disabled = true;
		} else {
			bottomButtonProps.className += "primary";
		}

		return (<div>
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-md-push-4 col-xs-6 col-xs-push-3">
						{!showRegister && <div><Form
							name="SignIn"
							title="Sign in"
							fields={fields}
							isFetching={isFetching}
							errorText={errorText}
							actions={actions}
							onSubmit={this._handleLogin.bind(this)}/>
							<br/>

							<div style={bottomFormStyle}>
								<button onClick={this._handleToggleRegister.bind(this)} {...bottomButtonProps}>
									Create new Account
								</button>
							</div>
						</div>
						}

						{showRegister &&
						<div><Form
							name="Register"
							title="Register"
							errorText={errorText}
							fields={fields}
							isFetching={isFetching}
							actions={actions}
							onSubmit={this._handleRegister.bind(this)}/>
							<br/>

							<div style={bottomFormStyle}>
								<button onClick={this._handleToggleRegister.bind(this)} {...bottomButtonProps}>
									Sign In
								</button>
							</div>
						</div>
						}

					</div>
				</div>
			</div>
		</div>);
	}
}

AuthRegister.contextTypes = {
	router: function () {
	}
};

export default createContainer(() => {
	return {};
}, AuthRegister);
