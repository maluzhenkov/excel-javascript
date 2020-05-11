import { ExcelComponent } from "@core/ExcelCompoent";
import { $ } from "@core/DOM";
import { changeTitle } from "@/rebux/actions";
import { defaultTitle } from "@/constants";

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input"],
      ...options,
    });
  }

  static className = "excel__header";

  toHTML() {
    const title = this.store.getState().tableTitle || defaultTitle;
    return `
        <div class="nav">
          <input
            class="text-field nav__title"
            type="text"
            value="${title}"
          />
        </div>

        <div class="controls">
          <div class="btn">
            <i class="material-icons">delete</i>
          </div>
          <div class="btn">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
