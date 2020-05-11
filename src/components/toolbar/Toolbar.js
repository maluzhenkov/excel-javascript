import { ExcelStateComponent } from "@core/ExcelStateComponent";
import { $ } from "@core/DOM";
import { createToolbar } from "./toolbar.template";
import { defaultStyle } from "@/constants";

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribe: ["currentStyles"],
      ...options,
    });
  }
  static className = "excel__toolbar";

  prepare() {
    this.initState(defaultStyle);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    const $parent = $target.parent("[data-type]");
    if ($parent) {
      $parent.toggleClass("active");
      const value = JSON.parse($parent.data.value);
      this.$emit("toolbar:applyStyles", value);
    }
  }
}
