import { toChar, toInlineStyles } from "@core/utils";
import { parse } from "@core/parse";
import { defaultStyle } from "@/constants";

const _codes = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 25;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeigth(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function withWidthFromState(state) {
  return function (content, index) {
    return {
      content,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

function createRow(content, index, state) {
  const info = index
    ? index + '<div class="row-resize" data-resize="row"></div>'
    : "";
  const height = getHeigth(state, index);
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}"
      style="height: ${height}"
      >
      <div class="row__info">${info}</div>
      <div class="row__data">${content}</div>
    </div>
  `;
}

function toColumn({ content, index, width }) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}"
      style="width: ${width};"
    >
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(state, row) {
  return function (_, col) {
    const id = `${col}:${row}`;
    const width = getWidth(state.colState, col);
    const data = state.cellState[id];
    const styles = toInlineStyles({
      ...defaultStyle,
      ...state.stylesState[id],
    });
    return `
      <div 
        class="cell" 
        data-col="${col}" 
        data-type="cell"
        data-id="${id}"
        data-value="${data || ""}"
        style="${styles}; width: ${width};"
        contenteditable
      >${parse(data) || ""}</div>
    `;
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = _codes.Z - _codes.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map((_, index) => toChar(_codes.A + index))
    .map(withWidthFromState(state))
    .map(toColumn)
    .join("");

  // 1я строка
  rows.push(createRow(cols, null, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(toCell(state, row))
      .join("");
    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join("");
}
