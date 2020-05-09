import { ExcelComponent } from "../../core/ExcelCompoent";

export class Header extends ExcelComponent {
  static className = "excel__header";

  toHTML() {
    return `
        <div class="nav">
          <input
            class="text-field nav__title"
            type="text"
            value="Новая таблица"
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
}
