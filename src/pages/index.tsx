import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import filter from "lodash/filter";
import map from "lodash/map";
import { ToastContainer } from "react-toastify";
import { TaskLists, ErrorMap } from "../types";
import { TODOLIST_ACTION_SAGA } from "../redux/types/typeActionSaga";
import { AppDispatch, RootState } from "../redux/store";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const renderDate = () => {
    const date = new Date();
    return (
      <div>
        <p>
          {date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            " - " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds()}
        </p>
      </div>
    );
  };

  const {
    GET_ALL_TASK_API_SAGA,
    ADD_TASK_API_SAGA,
    DELETE_TASK_API_SAGA,
    CHECK_TASK_API_SAGA,
    REJECT_TASK_API_SAGA,
  } = TODOLIST_ACTION_SAGA;

  const [state, setState] = useState<{
    arrTaskList: TaskLists[];
    values: {
      taskName: string;
    };
    error: {
      taskName: string;
    };
  }>({
    arrTaskList: [],
    values: {
      taskName: "",
    },
    error: {
      taskName: "",
    },
  });

  const [filterTask, setFilterTask] = useState<string>("All");

  const dispatch = useDispatch<AppDispatch>();

  const arrTask = useSelector((state: RootState) =>
    get(state, "todoReducer.arrTodo", [])
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTask(event.target.value);
  };

  const filteredTasks = () => {
    switch (filterTask) {
      case "Completed":
        return filter(arrTask, (task) => get(task, "status"));
      case "Incomplete":
        return filter(arrTask, (task) => !get(task, "status"));
      default:
        return arrTask;
    }
  };

  const handleChangeInput = (event: any) => {
    let { name, value } = event.target;

    const newValues = { ...state.values, [name]: value };

    const newError: ErrorMap = {};

    let regexString = /^[a-zA-Z0-9 ]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newError[name] = name + " is invalid !";
    } else {
      newError[name] = " ";
    }

    setState({
      ...state,
      values: newValues,
      error: {
        taskName: newError.taskName,
        ...newError,
      },
    });
  };

  const renderTaskToDo = () => {
    return map(
      filter(filteredTasks(), (task) => !get(task, "status")),
      (task, index) => (
        <li key={index}>
          <span>{get(task, "taskName", "")}</span>
          <div className="buttons">
            <button
              className="remove"
              type="button"
              onClick={() => {
                handleDeleteTask(get(task, "taskName", ""));
              }}
            >
              <i className="fa fa-trash-alt" />
            </button>
            <button
              type="button"
              className="complete"
              onClick={() => {
                handleDoneTask(get(task, "taskName", ""));
              }}
            >
              <i className="far fa-check-circle" />
            </button>
          </div>
        </li>
      )
    );
  };

  const renderTaskComplete = () => {
    return map(
      filter(filteredTasks(), (task) => get(task, "status")), // Sử dụng filteredTasks ở đây
      (task, index) => (
        <li key={index}>
          <span>{get(task, "taskName", "")}</span>
          <div className="buttons">
            <button
              className="remove"
              type="button"
              onClick={() => {
                handleDeleteTask(get(task, "taskName", ""));
              }}
            >
              <i className="fa fa-trash-alt" />
            </button>
            <button
              type="button"
              className="complete"
              onClick={() => {
                handleRejectTask(get(task, "taskName", ""));
              }}
            >
              <i className="fa fa-undo" />
            </button>
          </div>
        </li>
      )
    );
  };

  const handleDeleteTask = (taskName: string) => {
    dispatch({
      type: DELETE_TASK_API_SAGA,
      taskName,
    });
  };

  const handleDoneTask = (taskName: string) => {
    dispatch({
      type: CHECK_TASK_API_SAGA,
      taskName,
    });
  };

  const handleRejectTask = (taskName: string) => {
    dispatch({
      type: REJECT_TASK_API_SAGA,
      taskName,
    });
  };

  useEffect(() => {
    dispatch({
      type: GET_ALL_TASK_API_SAGA,
    });
  }, []);

  const handleAddTask = (event: any) => {
    event.preventDefault();
    dispatch({
      type: ADD_TASK_API_SAGA,
      taskName: get(state, "values.taskName", ""),
    });
    setState({
      ...state,
      values: {
        ...state.values,
        taskName: "",
      },
    });
  };

  return (
    <div className="card">
      <div className="card__header">
        <img src="./img/X2oObC4.png" alt="background" />
      </div>

      <form
        className="card__body"
        onSubmit={(event) => {
          handleAddTask(event);
        }}
      >
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <div>{renderDate()}</div>
          </div>
          <div className="form-group">
            <div className="card__add">
              <input
                id="newTask"
                type="text"
                placeholder="Enter an activity..."
                value={get(state, "values.taskName", "")}
                name="taskName"
                onChange={(event) => {
                  handleChangeInput(event);
                }}
              />
              <button
                id="addItem"
                type="button"
                onClick={(event) => {
                  handleAddTask(event);
                }}
              >
                <i className="fa fa-plus" />
              </button>
            </div>
            <p className="text-danger ms-2">{state.error.taskName}</p>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="taskFilter" className="form-label">
              Filter Tasks:
            </label>
            <select
              id="taskFilter"
              className="form-select"
              value={filterTask}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              <p>Task todo</p>
              {renderTaskToDo()}
            </ul>

            {/* Completed tasks */}
            <ul className="todo" id="completed">
              <p>Task complete</p>
              {renderTaskComplete()}
            </ul>
          </div>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default HomePage;
