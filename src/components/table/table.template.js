import { toChar } from "@core/utils";

const _codes = {
  A: 65,
  Z: 90,
};

function createRow(index, content) {
  const info = index
    ? index + '<div class="row-resize" data-resize="row"></div>'
    : "";
  return `
    <div class="row" data-type="resizable">
      <div class="row__info">${info}</div>
      <div class="row__data">${content}</div>
    </div>
  `;
}

function toColumn(content, index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">
    ${content}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `;
}

function toCell(row) {
  // eslint-disable-next-line space-before-function-paren
  return function (_, col) {
    return `
      <div 
        class="cell" 
        data-col="${col}" 
        data-type="cell"
        data-id="${col}:${row}" 
        contenteditable
      ></div>
    `;
  };
}

export function createTable(rowsCount = 15) {
  const colsCount = _codes.Z - _codes.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map((_, index) => toChar(_codes.A + index))
    .map(toColumn)
    .join("");

  // 1я строка
  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill("").map(toCell(row)).join("");
    rows.push(createRow(row + 1, cells));
  }

  return rows.join("");
}
