class DOM {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== "undefined") {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === "input") {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html("");
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  parent(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  toggleClass(className) {
    if (this.$el.classList.contains(className)) {
      this.$el.classList.remove(className);
    } else {
      this.$el.classList.add(className);
    }
    return this;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }

  getStyles(styles = []) {
    return styles.reduce((res, styleName) => {
      res[styleName] = this.$el.style[styleName];
      return res;
    }, {});
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (value !== undefined) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(":");
      return {
        col: +parsed[0],
        row: +parsed[1],
      };
    }
    return this.data.id;
  }

  get width() {
    return this.$el.scrollWidth;
  }

  get height() {
    return this.$el.scrollHeight;
  }

  get data() {
    return this.$el.dataset;
  }
}

export function $(selector) {
  if (selector) {
    return new DOM(selector);
  }
  return false;
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);

  if (typeof classes === "string") {
    el.classList.add(classes);
  }
  if (typeof classes === "object") {
    classes.forEach((className) => {
      el.classList.add(className);
    });
  }

  return $(el);
};
