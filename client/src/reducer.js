import * as actions from "./actionsTypes";

const INIT_STATE = {
  results: [],
};

export default function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case actions.GET_RESULTS: {
      return { ...state, results: action.payload };
    }
    case actions.SUBMIT_PAPER: {
    }
    default:
      return state;
  }
}
