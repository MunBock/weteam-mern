import axios from "axios";
import {
  TASKS_GET,
  TASKS_GET_SUCCESS,
  TASKS_GET_ERROR,
  TASK_GET,
  TASK_GET_SUCCESS,
  TASK_GET_ERROR,
  TASK_CREATE,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_ERROR,
  TASK_UPDATE,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_ERROR,
  TASK_DELETE,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_ERROR,
} from "../constants/index";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: TASKS_GET,
    });

    const { data } = await axios.get(`${baseUrl}/api/tasks`);

    dispatch({ type: TASKS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASKS_GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TASK_GET,
    });

    const { data } = await axios.get(`${baseUrl}/api/tasks/${id}`);

    dispatch({ type: TASK_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const createTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${baseUrl}/api/tasks`, task, config);

    dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_CREATE_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    dispatch({
      type: TASK_UPDATE,
    });

    const { data } = await axios.put(`${baseUrl}/api/tasks/${id}`, task);

    dispatch({ type: TASK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_UPDATE_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TASK_DELETE,
    });

    const { data } = await axios.delete(`${baseUrl}/api/tasks/${id}`);

    dispatch({ type: TASK_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_DELETE_ERROR,
      payload: error.response.data.message,
    });
  }
};
