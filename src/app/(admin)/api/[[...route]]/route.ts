import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import auth from '@/app/(auth)/server/route';
import todoList from '@/app/(admin)/to-do-list/server/route';
import countdown from '@/app/(admin)/countdown/server/route';
import focusMin from '@/app/(admin)/pomodoro-timer/server/route';

const app = new Hono().basePath('/api');
app.onError((err, c) => {
  let message = 'Unknown error';
  const status = 500; // 可以根據需要設置不同的錯誤狀態碼
  if (err instanceof Error) {
    message = err.message;
  }
  console.log('global catch', err);
  return c.json({ error: message }, { status });
});
const routes = app
  .route('/auth', auth)
  .route('/todo-list', todoList)
  .route('/countdown', countdown)
  .route('/focus-mins', focusMin);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
