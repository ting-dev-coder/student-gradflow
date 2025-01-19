import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/app/(auth)/server/route";
import todoList from "@/app/to-do-list/server/route";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", auth).route("/todo-list", todoList);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
