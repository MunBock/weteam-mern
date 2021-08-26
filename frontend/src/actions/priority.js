import axios from "axios";
import {
  PRIORITIES_GET,
  PRIORITIES_GET_SUCCESS,
  PRIORITIES_GET_ERROR,
} from "../constants/index";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getPriorities = () => async (dispatch) => {
  try {
    dispatch({
      type: PRIORITIES_GET,
    });

    const { data } = await axios.get(`${baseUrl}/api/priorities`);

    dispatch({ type: PRIORITIES_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRIORITIES_GET_ERROR,
      payload: error.response.data.message,
    });
  }
};
