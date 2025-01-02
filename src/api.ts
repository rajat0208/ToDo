import { remultNextApp } from "remult/remult-next";
import { Task } from "./shared/Task"
import { TasksController } from "./shared/TasksController";
import { getUserOnServer } from "./auth"

export const api = remultNextApp({
    entities:[Task],
    admin:true,
    controllers:[TasksController],
    getUser: getUserOnServer,
});

export const { POST, PUT, DELETE, GET } = api