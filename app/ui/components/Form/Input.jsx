import React, {Component, PropTypes} from "react";

const inputTypes = {
	string: {},
	text: {},
	list: {},
	miltilist: {},
	phone: {},
	email: {},
	date: {},
	time: {},
	datetime: {}
};

export default class Input extends Component {

	/**
	 * validate input
	 *
	 * @param renderErrors
	 * @returns {Promise}
	 * @private
	 */
	_validate(renderErrors = false) {
		let self = this;
		return new Promise(function (resolve, reject) {

		});
	}

	/**
	 * public method validate
	 *
	 * @returns {Promise}
	 */
	validate() {
		return this._validate(true);
	}

	/**
	 * public method check is form valid
	 *
	 * @returns {Promise}
	 */
	valid() {
		return this._validate();
	}

	value() {
		return this.refs.input.value;
	}

	_inputProps() {
		let {name, placeholder, label, type, readonly} = this.props;

		let props = {};
		props.placeholder = placeholder || label || name;
		props.name = name;
		props.className = "form-control";
		props.ref = "input";
		props['data-tag'] = 'input';

		if (readonly) {
			props.disabled = true;
			props.readOnly = true;
		}

		switch (type) {
			case 'text':
				props['data-tag'] = 'textarea';
				break;
			case "password":
				props.type = type;
				break;
			case "string":
			default:
				props.type = "text";
				break;
		}

		return props;
	}

	render() {
		let inputProps = this._inputProps();
		let Tag = inputProps['data-tag'];

		return (<div>
			<Tag {...inputProps}/>
		</div>);
	}
};

Input.propTypes = {
	readonly: PropTypes.bool,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onValidate: PropTypes.func,
	validators: PropTypes.array
};

Input.defaultProps = {
	type: "string",
	validators: []
};