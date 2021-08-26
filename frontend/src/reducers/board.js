import {
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  CLEAR_BOARD,
  ADD_MEMBER_CLEAR,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
} from "../constants/index";

const initialState = {
  boards: [],
  board: {},
  error: {},
};

export const boardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_BOARD:
      return {
        ...state,
        board: null,
      };
    case GET_BOARDS:
      return {
        ...state,
        boards: payload,
      };
    case GET_BOARD:
      return {
        ...state,
        memberAdded: false,
        board: payload,
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [payload, ...state.boards],
      };
    case BOARD_ERROR:
      return {
        ...state,
        error: payload,
      };
    case ADD_MEMBER_CLEAR:
      return {
        ...state,
        memberAdded: false,
        error: {},
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        memberAdded: true,
        board: {
          ...state.board,
          members: payload,
        },
      };
    case ADD_MEMBER_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
