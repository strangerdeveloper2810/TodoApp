import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { takeLatest, call, put } from "redux-saga/effects";
import get from "lodash/get";
import { toast, Bounce } from "react-toastify";
import { TODOLIST_ACTION_SAGA } from "../../types/typeActionSaga";
import { httpClient } from "../../../utils/settings";
import { TodoReducerAction } from "../../reducers/todo.reducers";
import { TaskLists } from "../../../types";

const {
  GET_ALL_TASK_API_SAGA,
  ADD_TASK_API_SAGA,
  DELETE_TASK_API_SAGA,
  CHECK_TASK_API_SAGA,
  REJECT_TASK_API_SAGA,
} = TODOLIST_ACTION_SAGA;

function* getTodolist(): SagaIterator {
  try {
    const response = yield call(() => httpClient.get("/GetAllTask"));
    if (get(response, "status") !== 200) {
      yield put(TodoReducerAction.getAllArrTodolist([]));
    }
    yield put(TodoReducerAction.getAllArrTodolist(get(response, "data", [])));
  } catch (error) {
    console.log(error);
  }
}

export function* actionGetTodolist() {
  yield takeLatest(GET_ALL_TASK_API_SAGA, getTodolist);
}

function* addTaskApiAction(action: PayloadAction<TaskLists[]>): SagaIterator {
  try {
    const taskName = get(action, "taskName", "");
    const response = yield call(() =>
      httpClient.post("/AddTask", { taskName })
    );

    if (get(response, "status") !== 200) {
      toast.error("Oops... Add Task Not Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    toast.success("🦄 Add task successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    yield put({
      type: GET_ALL_TASK_API_SAGA,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* actionAddTask() {
  yield takeLatest(ADD_TASK_API_SAGA, addTaskApiAction);
}

function* deleteTaskApiAction(
  action: PayloadAction<TaskLists[]>
): SagaIterator {
  try {
    const taskName = get(action, "taskName", "");

    const response = yield call(() =>
      httpClient.delete(`/deleteTask?taskName=${taskName}`)
    );

    if (get(response, "status") !== 200) {
      toast.error("Oops... Delete Task Not Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    toast.success("🦄 Delete task successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    yield put({
      type: GET_ALL_TASK_API_SAGA,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* actionDeleteTask() {
  yield takeLatest(DELETE_TASK_API_SAGA, deleteTaskApiAction);
}

function* checkTaskApiAction(action: PayloadAction<TaskLists[]>): SagaIterator {
  try {
    const taskName = get(action, "taskName", "");

    const response = yield call(() =>
      httpClient.put(`/doneTask?taskName=${taskName}`)
    );

    if (get(response, "status") !== 200) {
      toast.error("Oops... Updated Task Not Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    toast.success("🦄 Updated task successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    yield put({
      type: GET_ALL_TASK_API_SAGA,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* actionCheckTask() {
  yield takeLatest(CHECK_TASK_API_SAGA, checkTaskApiAction);
}

function* rejectTaskApiAction(
  action: PayloadAction<TaskLists[]>
): SagaIterator {
  const taskName = get(action, "taskName", "");
  try {
    const response = yield call(() =>
      httpClient.put(`/rejectTask?taskName=${taskName}`)
    );

    if (get(response, "status") !== 200) {
      toast.error("Oops... Reject Task Not Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    toast.success("🦄 Reject task successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    yield put({
      type: GET_ALL_TASK_API_SAGA,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* actionRejectTaskApi() {
  yield takeLatest(REJECT_TASK_API_SAGA, rejectTaskApiAction);
}
