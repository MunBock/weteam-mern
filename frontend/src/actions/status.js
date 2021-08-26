import axios from "axios";
import {
  STATUSES_GET,
  STATUSES_GET_SUCCESS,
  STATUSES_GET_ERROR,
} from "../constants/index";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getStatuses = () => async (dispatch) => {
  try {
    dispatch({
      type: STATUSES_GET,
    });

    const { data } = await axios.get(`${baseUrl}/api/statuses`);

    dispatch({ type: STATUSES_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATUSES_GET_ERROR,
      payload: error.response.data.message,
    });
  }
};
