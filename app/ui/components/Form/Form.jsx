import React, {Component, PropTypes} from "react";
import * as CommonHelper from "../../../helpers/Common";

import Input from "./Input";

export default class Form extends Component {

	/**
	 * handle submit form
	 * @returns {Promise.<T>}
	 * @private
	 */
	_submit() {
		let self = this;
		return this._validate(true).then(function (data) {
			self.props.onSubmit(false, data);
		}).catch(function (errors) {
			self.props.onSubmit(errors);
		});
	}

	/**
	 * validate form and subForms
	 *
	 * @param renderErrors
	 * @returns {Promise}
	 * @private
	 */
	_validate(renderErrors = false) {
		let self = this;
		let {fields} = this.props;

		return new Promise(function (resolve, reject) {
			let errors = [];
			let childForms = [];
			let data = {};

			for (var i = fields.length; i--;) {
				data[fields[i].name] = self.refs[fields[i].name].value();
			}

			if (!childForms.length) {
				return (errors.length) ? reject(errors) : resolve(data);
			}

		});
	}

	_handleSubmit(e) {
		e.preventDefault();
		this._submit();
	}

	/**
	 * public method submit
	 *
	 * @returns {Promise.<T>}
	 */
	submit() {
		return this._submit();
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

	_renderField(field, index) {
		let {initialValues, readonly, isFetching} = this.props;

		if (isFetching) {
			readonly = true;
		}

		let initialValue = initialValues[field.name] ? initialValues[field.name] : "";
		let fieldProps = Object.assign({
			readonly: readonly,
			initialValue: initialValue,
			key: "form-" + this.props.name + "-field-" + field.name + "-" + initialValue,
			ref: field.name
		}, field);

		return field.component ? <field.component {...fieldProps}/> : <Input {...fieldProps}/>;
	}

	_renderFields(formProps) {
		let self = this;
		let {fields} = this.props;

		if (!fields.length) {
			return null;
		}

		// make two arrays, hidden and not hidden fields
		let fieldsData = fields.reduce(function (memo, field) {
			if (field.type === "hidden") {
				memo.hidden.push(field);
			} else {
				memo.grid.push(field);
			}
			return memo;
		}, {hidden: [], grid: []});

		// create fields grid
		fieldsData.grid = CommonHelper.distributeRows(fieldsData.grid);

		// render hidden fields list
		let hiddenFields = fieldsData.hidden.map(function (field, num) {
			return self._renderField(field, num);
		});

		// render grid fields rows
		let gridFields = fieldsData.grid.map(function (row, rowNum) {
			row = row.map(function (field, index) {
				let fieldRowIndex = rowNum + "-" + index;
				let style = {padding: "0 7px"};
				let size = Math.floor(12 * (field._size || 0));
				let className = (size && size !== 12) ? "col-sm-" + size : "";

				return (<div
					key={"form-" + self.props.name + "-row-" + rowNum + "-sub-" + index}
					style={style}
					className={className}>{self._renderField(field, fieldRowIndex)}</div>);
			});

			return (<div
				key={"form-" + self.props.name + "-row-" + rowNum}
				style={{margin:"7px -7px"}}
				className="row">{row}</div>);
		});

		return (<div className="clearfix">
			{hiddenFields}
			{gridFields}
		</div>);
	}

	_renderActions(formProps) {

		let self = this;
		let {actions, isFetching} = this.props;

		if (!actions.length) {
			return null;
		}

		actions = actions.map(function (action, num) {

			let label = action.label || action.type;

			let buttonProps = Object.assign({
				className: "btn btn-md btn-"
			}, action);

			if (isFetching) {
				buttonProps.className += "disabled";
				buttonProps.disabled = true;
			} else {
				if (action.type === "submit") {
					buttonProps.className += "success";
				} else {
					buttonProps.className += action.type;
				}
			}


			return <span key={"form-" + self.props.name + "-footer-action-" + action.type + "-" + num}>
				&nbsp;
				<button {...buttonProps}>{label}</button>
			</span>;
		});
		return (<div>
			<br/>
			<footer style={{textAlign:"right"}}>
				{actions}
			</footer>
		</div>);
	}

	_formProps() {
		let {className, name} = this.props;

		let props = {};
		props.id = name;
		props["data-formname"] = name;
		props.className = className;
		props.onSubmit = this._handleSubmit.bind(this);

		return props;
	}

	render() {
		let {title, errorText,isFetching} = this.props;
		let formProps = this._formProps();
		let FormTag = (this.props.isSubForm) ? "div" : "form";

		return (<div>
			{title && <h2>{title}</h2>}
			<FormTag {...formProps}>
				{isFetching &&
				<div style={{textAlign:"center"}}><span className="label label-info">Loading...</span></div>
				}
				{this._renderFields(formProps)}
				{errorText && <div className="alert alert-danger" style={{padding: "7px", margin: 0}}>{errorText}</div>}
				{this._renderActions(formProps)}
			</FormTag>
		</div>);

	}
}

Form.propTypes = {
	isSubForm: PropTypes.bool.isRequired,
	readonly: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	title: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
	errorText: PropTypes.string.isRequired,
	initialValues: PropTypes.object.isRequired,
};

Form.defaultProps = {
	readonly: false,
	title: "", // form title block value
	isFetching: true, // fetch data process
	errorText: "", // if data load error - this is message
	isSubForm: false, // this is subform (import form to fields array parent form)?
	fields: [], // form fields
	actions: [], // form actions
	onSubmit: function (err, data) {
		console.log("submit form", this.props.name, err, data);
	},
	className: "",
	initialValues: {}
};
