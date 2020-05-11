import { ExcelComponent } from "@core/ExcelCompoent";
import { parse } from "@core/parse";
import { $ } from "@core/DOM";
import * as actions from "@/rebux/actions";
import { defaultStyle } from "@/constants";

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
    return createTable(25, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$on("formula:input", (value) => {
      this.selection._curent.attr("data-value", value).text(parse(value));
      this.updateTextInStore(value);
    });
    this.$on("formula:done", () => {
      this.selection._curent.focus();
    });
    this.$on("toolbar:applyStyles", (value) => {
      this.selection.applyStyles(value);
      this.$dispatch(
        actions.applyStyles({
          value,
          ids: this.selection.selectedIds,
        })
      );
    });
    // test
    // this.$subscribe((state) => {
    //   console.log("StateTable", state);
    // });
  }

  destroy() {
    super.destroy();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyle));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable() {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (err) {
      console.warn("Resize error:", err.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection._curent).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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
      this.selectCell($next);
    }
  }

  onInput(event) {
    // this.$emit("table:input", $(event.target));
    this.updateTextInStore($(event.target).text());
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection._curent.id(),
        value,
      })
    );
  }
}
