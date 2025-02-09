import { DATABASE_ID, TODO_LIST_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Query } from 'node-appwrite';
import { createTodoSchema, editTodoSchema } from '../schemas';
import { setHeapSnapshotNearHeapLimit } from 'v8';
import dayjs from 'dayjs';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    const { createdAt } = c.req.query();
    const queries = [Query.equal('userId', user.$id)];
    if (createdAt) {
      queries.push(
        Query.equal('startDate', dayjs(createdAt).format('YYYY-MM-DD'))
      );
    }

    const toDoList = await databases.listDocuments(
      DATABASE_ID,
      TODO_LIST_ID,
      queries
    );

    if (toDoList?.total === 0) {
      return c.json({
        data: { documents: [], total: 0 },
      });
    }

    return c.json({ data: toDoList });
  })
  .get(':taskId', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const { taskId } = c.req.param();

    const task = await databases.getDocument(DATABASE_ID, TODO_LIST_ID, taskId);
    if (!task) {
      return c.json({ data: null });
    }
    return c.json({ data: task });
  })
  .post(
    '/',
    zValidator('form', createTodoSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const {
        title,
        startDate,
        startTime,
        endTime,
        allDay,
        category,
        status,
        description,
      } = c.req.valid('form');

      const res = await databases.createDocument(
        DATABASE_ID,
        TODO_LIST_ID,
        'unique()',
        {
          title,
          userId: user.$id,
          startDate: dayjs(startDate).format('YYYY-MM-DD'),
          startTime,
          endTime,
          allDay,
          category,
          status,
          description,
        }
      );
      return c.json({ data: res });
    }
  )
  .patch(
    ':taskId',
    sessionMiddleware,
    zValidator('form', editTodoSchema),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');

      const { taskId } = c.req.param();
      const {
        title,
        startDate,
        startTime,
        endTime,
        allDay,
        category,
        status,
        description,
      } = c.req.valid('form');

      // check if doc exist, and check if it belong to the current user
      const toDoList = await databases.getDocument(
        DATABASE_ID,
        TODO_LIST_ID,
        taskId
      );

      if (toDoList.userId !== user.$id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const res = await databases.updateDocument(
        DATABASE_ID,
        TODO_LIST_ID,
        taskId,
        {
          title,
          userId: user.$id,
          startDate,
          startTime,
          endTime,
          allDay,
          category,
          status,
          description,
        }
      );
      return c.json({ data: res });
    }
  )
  .delete(':taskId', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    const { taskId } = c.req.param();

    // check if the data exit and check if it belongs to the current user
    const toDoList = await databases.getDocument(
      DATABASE_ID,
      TODO_LIST_ID,
      taskId
    );

    if (toDoList.userId !== user.$id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const res = await databases.deleteDocument(
      DATABASE_ID,
      TODO_LIST_ID,
      taskId
    );

    return c.json({ data: res });
  });

export default app;
