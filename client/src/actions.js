import * as actions from "./actionsTypes";

export const setResults = (results) => {
  return {
    type: actions.GET_RESULTS,
    payload: results,
  };
};

export const setSort = (value) => {
  var type;
  console.log(value);
  if (value == "ascending") {
    type = actions.ASCENDING_ORDER;
  } else if (value == "descending") {
    type = actions.DESCENDING_ORDER;
  } else {
    type = actions.NO_ORDER;
  }
  return {
    type: type,
    payload: value,
  };
};
