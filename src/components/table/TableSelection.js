export class TableSelection {
  constructor() {
    this._group = [];
    this._curent = null;
  }

  static className = "selected";

  select($el) {
    this.clear();
    $el.focus().addClass(TableSelection.className);
    this._curent = $el;
    this._group = [$el];
  }

  clear() {
    this._group.forEach(($el) => $el.removeClass(TableSelection.className));
  }

  selectGroup($group = []) {
    this.clear();
    this._group = $group;
    this._group.forEach(($el) => $el.addClass(TableSelection.className));
  }
}
