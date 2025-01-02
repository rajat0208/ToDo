import { remultNextApp } from "remult/remult-next";
import { Task } from "./shared/Task"
import { TasksController } from "./shared/TasksController";

export const api = remultNextApp({
    entities:[Task],
    admin:true,
    controllers:[TasksController]
});

export const { POST, PUT, DELETE, GET } = api