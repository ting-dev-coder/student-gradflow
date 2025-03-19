import { DATABASE_ID, FOCUS_MINS_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Query } from 'node-appwrite';
import { createFocusRecordSchema } from '../schemas';
import { startOfWeek, addDays, formatISO, endOfWeek } from 'date-fns';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');
    const { date } = c.req.query();

    const queries = [Query.equal('userId', user.$id)];
    if (date) {
      const startOfWeekDate = startOfWeek(new Date());

      const endOfWeekDate = endOfWeek(new Date());

      // 轉換為 ISO 格式
      const startOfWeekISO = formatISO(startOfWeekDate, {
        representation: 'date',
      });
      const endOfWeekISO = formatISO(endOfWeekDate, { representation: 'date' });
      queries.push(
        Query.greaterThanEqual('date', startOfWeekISO),
        Query.lessThanEqual('date', endOfWeekISO)
      );
    }
    console.log('queries', queries);
    const countdownList = await databases.listDocuments(
      DATABASE_ID,
      FOCUS_MINS_ID,
      queries
    );

    if (countdownList?.total === 0) {
      return c.json({
        data: { documents: [], total: 0 },
      });
    }

    return c.json({ data: countdownList });
  })
  .post(
    '/',
    sessionMiddleware,
    zValidator('form', createFocusRecordSchema),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');

      const { date, mins } = c.req.valid('form');

      const res = await databases.createDocument(
        DATABASE_ID,
        FOCUS_MINS_ID,
        'unique()',
        {
          userId: user.$id,
          mins,
          date,
        }
      );
      return c.json({ data: { document: res } });
    }
  );

export default app;
