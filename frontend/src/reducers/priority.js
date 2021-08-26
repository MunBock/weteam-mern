import {
  PRIORITIES_GET,
  PRIORITIES_GET_SUCCESS,
  PRIORITIES_GET_ERROR,
} from "../constants/index";

const initailState = {
  priorities: [],
  loading: false,
  error: {},
};

export const priorityReducer = (state = initailState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRIORITIES_GET:
      return {
        ...state,
        loading: true,
      };
    case PRIORITIES_GET_SUCCESS:
      return {
        ...state,
        priorities: payload,
        loading: false,
      };

    case PRIORITIES_GET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
