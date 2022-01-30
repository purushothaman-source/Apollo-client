import { loader } from "graphql.macro";

/* tasks */
const addTask = loader("./task/addtask.graphql");
const getAllTasks = loader("./task/readAllTasks.graphql");
const deleteTask = loader("./task/deleteTask.graphql");
const updateTask = loader("./task/updateTask.graphql");

export { addTask, getAllTasks, deleteTask, updateTask };
