import React, {Component, PropTypes} from "react";

const config = require('../../config/app.conf.json');

export default class SetDocumentTitle extends Component {

	_update() {
		document.title = this.props.title + ' | ' + config.client.pageTitle;
	}

	componentDidMount() {
		this._update();
	}

	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
		this._update();
	}

	render() {
		return <div />;
	}
}

SetDocumentTitle.propTypes = {
	title: PropTypes.string.isRequired
};