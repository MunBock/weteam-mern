import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { priorityReducer } from "./reducers/priority";
import { statusReducer } from "./reducers/status";
import { taskReducer } from "./reducers/task";
import { boardReducer } from "./reducers/board";
import { userLoginReducer, userRegisterReducer } from "./reducers/user";

const reducer = combineReducers({
  priorityStore: priorityReducer,
  taskStore: taskReducer,
  statusStore: statusReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  boardStore: boardReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
