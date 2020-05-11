import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLES,
  CHANGE_TITLE,
} from "./types";

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === "col" ? "colState" : "rowState";
      return { ...state, [field]: value(state, field, action) };
    case CHANGE_TEXT:
      field = "cellState";
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      };
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data,
      };
    case CHANGE_TITLE:
      return {
        ...state,
        tableTitle: action.data,
      };
    case APPLY_STYLES:
      field = "stylesState";
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    default:
      return state;
  }
}

function value(state, field, action) {
  const value = state[field] || {};
  value[action.data.id] = action.data.value;
  return value;
}
