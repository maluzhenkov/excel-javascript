// Pure Functions
export function capitalize(string) {
  if (typeof string !== "string") {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toChar(number) {
  if (typeof number !== "number") {
    throw new Error(`${number} is not a number`);
  }
  return String.fromCharCode(number);
}

export function range(start, end) {
  if (start > end) {
    // меняем местами
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill("").map((_, index) => start + index);
}
