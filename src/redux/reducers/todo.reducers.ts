import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskLists } from "../../types";

type TodoState = {
  arrTodo: TaskLists[];
};
const initialState: TodoState = {
  arrTodo: [],
};

const TodoReducer = createSlice({
  name: "TodoReducer",
  initialState,
  reducers: {
    getAllArrTodolist(state: TodoState, action: PayloadAction<TaskLists[]>) {
      state.arrTodo = action.payload;
    },
  },
});

export const TodoReducerAction = TodoReducer.actions;
export default TodoReducer.reducer;
