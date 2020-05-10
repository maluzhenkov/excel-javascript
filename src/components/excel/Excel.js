import { Emitter } from "@core/Emitter";
import { $ } from "@core/DOM";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create("div", "excel");
    const componentOptions = {
      emitter: this.emitter,
    };
    this.components = this.components.map((Component) => {
      const classes = [Component.className.split("__")[1], Component.className];
      const $el = $.create("div", classes);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
