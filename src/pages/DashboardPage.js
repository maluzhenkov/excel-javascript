import { Page } from "@core/router/Page";
import { $ } from "@core/DOM";
import { createRecordsTable } from "./dashboard.functions";

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create("div", "dashboard").html(`
      <div class="dashboard__header">
        <h1>Excel. Панель Управления</h1>
      </div>

      <div class="dashboard__new-table">
        <div class="dashboard__view">
          <a 
            href="#excel/${now}" 
            class="dashboard__create"
          > Новая<br />Таблица </a>
        </div>
      </div>

      <div class="table-list dashboard__table-list dashboard__view">

        ${createRecordsTable()}

      </div>
    `);
  }
}
