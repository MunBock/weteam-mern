import axios from "axios";
import {
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  CLEAR_BOARD,
  ADD_MEMBER_CLEAR,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
  TASKS_GET,
  TASKS_GET_SUCCESS,
  CLEAR_TASKS,
} from "../constants/index";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getBoards = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CLEAR_BOARD });
    dispatch({ type: CLEAR_TASKS });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/boards`, config);

    dispatch({
      type: GET_BOARDS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getBoard = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASKS_GET });
    dispatch({ type: ADD_MEMBER_CLEAR });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/boards/${id}`, config);

    if (data) {
      axios.defaults.headers.common["boardId"] = id;
    } else {
      delete axios.defaults.headers.common["boardId"];
    }

    dispatch({
      type: GET_BOARD,
      payload: data,
    });

    dispatch({
      type: TASKS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const addBoard = (board) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${baseUrl}/api/boards`, board, config);

    dispatch({
      type: ADD_BOARD,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const addMember = (username) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${baseUrl}/api/boards/member/${username}`,
      {},
      config
    );

    dispatch({
      type: ADD_MEMBER_SUCCESS,
      payload: data,
    });

    dispatch({ type: ADD_MEMBER_CLEAR });
  } catch (error) {
    dispatch({
      type: ADD_MEMBER_ERROR,
      payload: error.response.data.message,
    });
  }
};
