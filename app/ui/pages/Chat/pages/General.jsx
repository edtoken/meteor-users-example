import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import { createContainer } from "meteor/react-meteor-data";
import React, {Component} from "react";

import moment from 'moment';

const config = require('../../../../config/app.conf.json');

import {Form} from '../../../components/Form/index';
import {Messages} from '../../../../api/Message';

class MessageForm extends Component {

	_handleSubmitAdd(err, data) {
		if (!err) {
			Meteor.call('messages.insert', data.message);
		}
	}

	render() {
		let fields = [
			{name: 'message', type: 'text', _size: 1}
		];
		let actions = [
			{type: 'submit', label: 'Post'}
		];
		return (<div>
			<Form
				name="AddMessage"
				isFetching={false}
				fields={fields}
				actions={actions}
				onSubmit={this._handleSubmitAdd.bind(this)}/>
		</div>);
	}
}

class MessageItem extends Component {

	render() {
		let {message, users} = this.props;
		let user = users.find(u => (u._id === message.owner));
		let time = moment(message.createdAt).format(config.client.dateTimeFormat);
		// todo create user name
		let userName = user._id;

		return (<div className="panel panel-default">
			<div className="panel-heading"><span className="label label-info">{time}</span> {userName}</div>
			<div className="panel-body">
				{message.text}
			</div>
		</div>);
	}
}

class MessagesList extends Component {
	render() {
		let {messages, users} = this.props;
		messages = messages.map((msg, num) => (
			<MessageItem key={'messagesListItem' + num + '-' + msg._id} message={msg} users={users}/>
		));

		return (<div>{messages}</div>);
	}
}

export default class GeneralChat extends Component {
	render() {
		let {currentUser, messages, users} = this.props;
		return (<div>
			<MessageForm currentUser={currentUser}/>
			<hr/>
			<MessagesList messages={messages} users={users}/>
		</div>);
	}
}

export default createContainer(() => {
	Meteor.subscribe('messages');
	Meteor.subscribe('users');
	// todo need join data message.owner + user name
	return {
		currentUser: Meteor.user(),
		users: Meteor.users.find().fetch(),
		messages: Messages.find({}, {sort: {createdAt: -1}}).fetch()
	};
}, GeneralChat);