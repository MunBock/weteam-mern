import {
  TASKS_GET,
  TASK_GET,
  TASK_CREATE,
  TASK_UPDATE,
  TASK_DELETE,
  TASKS_GET_SUCCESS,
  TASK_CREATE_SUCCESS,
  TASK_UPDATE_SUCCESS,
  TASK_DELETE_SUCCESS,
  TASKS_GET_ERROR,
  TASK_GET_ERROR,
  TASK_CREATE_ERROR,
  TASK_UPDATE_ERROR,
  TASK_DELETE_ERROR,
  CLEAR_TASKS,
} from "../constants/index";

const initialState = {
  tasks: [],
  loading: false,
  error: {},
};

export const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_TASKS:
      return {
        ...state,
        tasks: [],
      };
    case TASKS_GET:
    case TASK_GET:
    case TASK_CREATE:
    case TASK_UPDATE:
    case TASK_DELETE:
      return {
        ...state,
        created: false,
        updated: false,
        deleted: false,
        loading: true,
      };
    case TASKS_GET_SUCCESS:
      return {
        ...state,
        tasks: payload.tasks,
        loading: false,
      };
    case TASK_CREATE_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, payload],
        created: true,
        loading: false,
      };
    case TASK_UPDATE_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? { ...payload } : task
        ),
        updated: true,
        loading: false,
      };
    case TASK_DELETE_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
        deleted: true,
        loading: false,
      };
    case TASKS_GET_ERROR:
    case TASK_GET_ERROR:
    case TASK_CREATE_ERROR:
    case TASK_UPDATE_ERROR:
    case TASK_DELETE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
