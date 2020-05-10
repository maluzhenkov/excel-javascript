import { ExcelComponent } from "@core/ExcelCompoent";
import { $ } from "@core/DOM";

import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { shouldResize, isCell, matrix, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }
  static className = "excel__table";

  toHTML() {
    return createTable(25);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.celectCell(this.$root.find('[data-id="0:0"]'));
    this.$on("formula:input", (text) => {
      this.selection._curent.text(text);
    });
    this.$on("formula:done", () => {
      this.selection._curent.focus();
    });
  }

  destroy() {
    super.destroy();
  }

  celectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection._curent).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.celectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ];

    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const coords = this.selection._curent.id(true);
      const $next = this.$root.find(nextSelector(key, coords));
      this.celectCell($next);
    }
  }

  onInput(event) {
    this.$emit("table:input", $(event.target));
  }
}
