import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";

import React, {Component} from "react";
import {Table} from "../../../components/Table/index";

export class UsersPage extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let {users} = this.props;

		let tableProps = {
			results: users,
			columns: [
				{columnName: '_id', displayName: 'User'},
				{columnName: 'emails', displayName: 'Emails'}
			],
			customRender: [
				{
					columns: ['_id'],
					customComponent: (data) => {
						let label = 'user';
						let url = '/users/' + data;
						return '<a href="' + url + '">' + label + '</a>';
					}
				},
				{
					columns: ['emails'],
					customComponent: (data) => {
						return data.map(d => (d.address)).join(',');
					}
				}
			]
		};

		return (<div>
			<Table {...tableProps}/>
		</div>);
	}
}

export default createContainer(() => {
	return {
		users: Meteor.users.find().fetch()
	};
}, UsersPage);
