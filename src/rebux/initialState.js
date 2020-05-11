import { storage } from "@core/utils";
import { defaultStyle, defaultTitle } from "@/constants";

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  cellState: {},
  stylesState: {},
  currentText: "",
  currentStyles: defaultStyle,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyle,
  currentText: "",
});

export const initialState = storage("excel-state")
  ? normalize(storage("excel-state"))
  : defaultState;
