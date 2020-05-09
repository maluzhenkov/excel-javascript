class DOM {
  constructor(selector) {
    // this._listeners = {};
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

  clear() {
    this.html("");
    return this;
  }

  on(eventType, callback) {
    // this._listeners[eventType] = callback;
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
}

export function $(selector) {
  return new DOM(selector);
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