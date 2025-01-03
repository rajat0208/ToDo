import { remultNextApp } from "remult/remult-next";
import { Task } from "./shared/Task"
import { TasksController } from "./shared/TasksController";
import { getUserOnServer } from "./auth"
import { createPostgresDataProvider } from "remult/postgres"

const DATABASE_URL = process.env["DATABASE_URL"]

export const api = remultNextApp({
    entities:[Task],
    admin:true,
    controllers:[TasksController],
    getUser: getUserOnServer,
    dataProvider: DATABASE_URL
    ? createPostgresDataProvider({ connectionString: DATABASE_URL })
    : undefined,
});

export const { POST, PUT, DELETE, GET } = api