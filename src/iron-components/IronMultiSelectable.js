import IronSelection from './IronSelection';

export default class IronMultiSelectable extends IronSelection {
	constructor(props) {
		super(props);
		this.multi = props.multi || false;
		this.selectedValues = [];
		this.selectedItems = [];
	}
	push(prop, value) {
		this[prop].push(value);
	}
	splice(prop, index, len) {
		this[prop].splice(index, len);
	}

	/**
     * Selects the given value. If the `multi` property is true, then the selected state of the
     * `value` will be toggled; otherwise the `value` will be selected.
     *
     * @method select
     * @param {string|number} value the value to select.
     */
	select(value) {
		if (this.multi) {
			this._toggleSelected(value);
		} else {
			this.selected = value;
		}
	}
	_updateSelected() {
		if (this.multi) {
			this._selectMulti(this.selectedValues);
		} else {
			this._selectSelected(this.selected);
		}
	}
	_toggleSelected(value) {
		var i = this.selectedValues.indexOf(value);
		var unselected = i < 0;
		if (unselected) {
			this.push("selectedValues", value);
		} else {
			this.splice("selectedValues", i, 1);
		}
	}
	_valuesToItems(values) {
		return values == null
			? null
			: values.map(function(value) {
					return this._valueToItem(value);
				}, this);
	}
	_selectMulti(values) {
		values = values || [];
		var selectedItems = (this._valuesToItems(values) || []).filter(function(
			item
		) {
			return item !== null && item !== undefined;
		});
		// clear all but the current selected items
		this._selection.clear(selectedItems);
		// select only those not selected yet
		for (var i = 0; i < selectedItems.length; i++) {
			this._selection.setItemSelected(selectedItems[i], true);
		}
		// Check for items, since this array is populated only when attached
		if (this.fallbackSelection && !this._selection.get().length) {
			var fallback = this._valueToItem(this.fallbackSelection);
			if (fallback) {
				this.select(this.fallbackSelection);
			}
		}
	}
}
