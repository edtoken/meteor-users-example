import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import { createContainer } from "meteor/react-meteor-data";
import React, {Component} from "react";

import SetDocumentTitle from '../../utils/SetDocumentTitle';

import Header from './Header';
import Sidebar from './Sidebar';

export class Layout extends Component {

	componentDidMount() {
		// global lick click, todo: check remote links
		document.addEventListener('click', (e) => {
			if (e.target.nodeName !== 'A') {
				return;
			}
			e.preventDefault();
			let href = e.target.getAttribute('href');
			this.context.router.push(href);
		});
	}

	_renderOnlyChild() {
		return (<div>
			{this.props.children}
			{this._renderDocumentTitleUtil()}
		</div>);
	}

	_renderDocumentTitleUtil() {
		let pageRoute = this.props.children.props.route;
		let title = pageRoute.path;
		return <SetDocumentTitle title={title}/>;
	}

	render() {
		let {currentUser} = this.props;
		if (!currentUser) {
			return this._renderOnlyChild();
		}

		let pageRoute = this.props.children.props.route;
		let title = pageRoute.path;

		return (<div>
			<Header />

			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="page-header">
							<h1>{title}</h1>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-sm-4 col-md-3">
						<Sidebar />
					</div>
					<div className="col-sm-8 col-md-9">
						{this.props.children}
					</div>
				</div>
			</div>
			{this._renderDocumentTitleUtil()}
		</div>);
	}
}


Layout.contextTypes = {
	router: function () {
	}
};

export default createContainer(() => {

	return {
		currentUser: Meteor.user()
	};
}, Layout);
