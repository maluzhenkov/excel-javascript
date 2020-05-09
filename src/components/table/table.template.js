import { toChar } from "@core/utils";

const _codes = {
  A: 65,
  Z: 90,
};

function createRow(index, content) {
  return `
    <div class="row">
      <div class="row__info">${index || ""}</div>
      <div class="row__data">${content}</div>
    </div>
  `;
}

function toCol(content) {
  return `<div class="column">${content}</div>`;
}

function toCell() {
  return `<div class="cell" contenteditable></div>`;
}

export function createTable(rowsCount = 15) {
  const colsCount = _codes.Z - _codes.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map((_, index) => toChar(_codes.A + index))
    .map(toCol)
    .join("");

  // 1 строка
  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill("").map(toCell).join("");
    rows.push(createRow(i + 1, cells));
  }

  return rows.join("");
}
