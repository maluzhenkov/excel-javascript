import { $ } from "@core/DOM";
import { ActiveRoute } from "./ActiveRoute";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error("Selector is not provided in Router");
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);

    this.page = null;

    this.init();
  }

  init() {
    window.addEventListener("hashchange", this.changePageHandler);
    this.changePageHandler();
  }

  destroy() {
    window.removeEventListener("hashchange", this.changePageHandler);
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    // Не будем усложнять т.к. у нас всего 2 страницы
    const Page = ActiveRoute.path.includes("excel")
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
}
