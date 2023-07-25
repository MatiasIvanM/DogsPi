import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../Redux/Reducers/reducers";
import ThunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware))
);

export default store;

/* import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Redux/Reducers/reducers";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
    applyMiddleware(thunk)
); */