import * as actions from "./actionsTypes";
import * as sort from "./sortingbydate";

const INIT_STATE = {
  results: [],
  display: sort.noSort,
  user: null,
};

export default function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case actions.GET_RESULTS: {
      return { ...state, results: state.display(action.payload) };
    }
    case actions.SET_USER: {
      return { ...state, user: action.payload };
    }
    case actions.ASCENDING_ORDER: {
      return {
        ...state,
        display: sort.ascendingSort,
      };
    }
    case actions.DESCENDING_ORDER: {
      return {
        ...state,
        display: sort.descendingSort,
      };
    }
    case actions.NO_ORDER: {
      return {
        ...state,
        display: sort.noSort,
      };
    }
    case actions.SUBMIT_PAPER: {
    }
    default:
      return state;
  }
}
