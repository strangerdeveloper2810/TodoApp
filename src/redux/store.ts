import { configureStore } from "@reduxjs/toolkit";
import reateSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import todoReducer from "./reducers/todo.reducers";

const sagaMiddleware = reateSagaMiddleware();

export const store = configureStore({
  reducer: {
    todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
