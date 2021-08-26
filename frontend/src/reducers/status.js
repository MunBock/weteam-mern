import {
  STATUSES_GET,
  STATUSES_GET_SUCCESS,
  STATUSES_GET_ERROR,
} from "../constants/index";

const initailState = {
  statuses: [],
  loading: false,
  error: {},
};

export const statusReducer = (state = initailState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STATUSES_GET:
      return {
        ...state,
        loading: true,
      };
    case STATUSES_GET_SUCCESS:
      return {
        ...state,
        statuses: payload,
        loading: false,
      };

    case STATUSES_GET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
