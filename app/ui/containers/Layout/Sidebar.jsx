import React, {Component} from "react";

export default class Sidebar extends Component {
	render() {
		return (<div>
			<ul className="nav nav-sidebar">
				<li><a href="/users">Users</a></li>
				<li><a href="/chat">Chat</a></li>
			</ul>
		</div>);
	}
}