import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "[anonymous]";
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  // Настраиваем наш компонент до init
  prepare() {}

  // Возвращаяет шаблон компонента
  toHTML() {
    return "";
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Приходят только изменения по тем полям на каторые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Инициализируем компонент / добавляем DOM слушатели
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент / чистим DOM слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
