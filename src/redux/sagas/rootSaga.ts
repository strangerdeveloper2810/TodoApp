import { all } from "redux-saga/effects";
import * as TodolistSagaAction from "./todoSaga";
export default function* rootSaga() {
  yield all([
    TodolistSagaAction.actionGetTodolist(),
    TodolistSagaAction.actionAddTask(),
    TodolistSagaAction.actionDeleteTask(),
    TodolistSagaAction.actionCheckTask(),
    TodolistSagaAction.actionRejectTaskApi(),
  ]);
}
