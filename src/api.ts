import { remultNextApp } from "remult/remult-next";
import { Task } from "./shared/Task"

export const api = remultNextApp({
    entities:[Task],
    admin:true
});

export const { POST, PUT, DELETE, GET } = api