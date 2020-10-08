import * as actions from "./actionsTypes";

export const setResults = (results) => {
  return {
    type: actions.GET_RESULTS,
    payload: results,
  };
};
