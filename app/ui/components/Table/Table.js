import React, {Component, PropTypes} from "react";
import * as CommonHelper from "../../../helpers/Common";
import Griddle from 'griddle-react';


class CustomRowComponent extends Component {

	render() {

		let CustomComponent = this.props.metadata.customRender.customComponent;
		if (typeof CustomComponent === 'function') {
			return (<div
					dangerouslySetInnerHTML={{ __html: CustomComponent(this.props.data, this.props.rowData, this.props.metadata.table)}}/>
			);
		}

		let componentProps = CustomComponent.props || {};
		let props = Object.assign({}, {
			data: this.props.data,
			rowData: this.props.rowData,
			table: this.props.metadata.table
		}, componentProps);

		return <div>
			<CustomComponent.type {...props}/>
		</div>;
	}
}

export default class Table extends Component {

	_getGriddleColumnMetadata() {

		let {columns, customRender} = this.props;

		return columns.map((col, num) => {
			let customMeta = {};
			customMeta.table = this;

			let columnCustomRenderData = customRender.find(c => (c.columns.indexOf(col.columnName) >= 0));
			customMeta.customRender = columnCustomRenderData;

			if (columnCustomRenderData) {
				if (columnCustomRenderData.customComponent) {
					customMeta.customComponent = CustomRowComponent;
				}
			}

			return Object.assign({}, col, customMeta, {
				columnName: col.columnName,
				displayName: col.displayName || col.columnName,
				order: num
			});
		});
	}

	_getGriddleProps() {
		let {results, columns} = this.props;
		let griddleColumns = columns.map(c => (c.columnName));
		let columnMetadata = this._getGriddleColumnMetadata();

		return {
			results,
			columns: griddleColumns,
			columnMetadata
		};
	}

	render() {
		let griddleProps = this._getGriddleProps();

		return (<div>
			<Griddle ref="table" {...griddleProps}/>
		</div>);
	}
};

Table.propTypes = {
	results: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	customRender: PropTypes.array.isRequired,
};

Table.defaultProps = {
	customRender: []
};