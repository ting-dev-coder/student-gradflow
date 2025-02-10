import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import auth from '@/app/(auth)/server/route';
import todoList from '@/app/(admin)/to-do-list/server/route';
import countdown from '@/app/(admin)/countdown/server/route';

const app = new Hono().basePath('/api');

const routes = app
  .route('/auth', auth)
  .route('/todo-list', todoList)
  .route('/countdown', countdown);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
