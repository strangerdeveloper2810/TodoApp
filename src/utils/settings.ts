import axios from "axios";

const apiURL: string = "http://svcy.myclass.vn/api/ToDoList/";

export const httpClient = axios.create({
  baseURL: apiURL,
  timeout: 3000,
});
