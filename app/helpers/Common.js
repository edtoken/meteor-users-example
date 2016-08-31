/**
 * distribute the rows of elements, according to their size
 * [{_size:1}, {_size:0.5}, {_size:0.5}] === [[{_size:1}], [{_size:0.5}, {_size:0.5}]]
 *
 */
export const distributeRows = (items = [], defaultColumnsSize = 0.5) => {

	var rows = [];
	var row = [];
	var rowSize = 0;

	for (var i = 0; i < items.length; i++) {
		var itemSize = (items[i]._size != undefined) ? items[i]._size : (items[i]._size = defaultColumnsSize, defaultColumnsSize);
		var updateRowSize = rowSize + itemSize;

		if (updateRowSize > 1) {
			rows.push(row);
			row = [items[i]];
			rowSize = itemSize;
			continue;
		}

		row.push(items[i]);
		rowSize += itemSize;
	}

	if (row.length) {
		rows.push(row);
	}

	return rows;
};