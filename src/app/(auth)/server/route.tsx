import { z } from 'zod';
import { AppwriteException, ID } from 'node-appwrite';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { loginSchema, registerSchema } from '../schemas';
import { createAdminClient } from '@/lib/appwrite';
import { deleteCookie, setCookie } from 'hono/cookie';
import { AUTH_COOKIE } from '../constants';
import { sessionMiddleware } from '@/lib/session-middleware';

const app = new Hono()
  .get('/current', sessionMiddleware, (c) => {
    const user = c.get('user');
    return c.json({ data: user });
  })
  .post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    const { account } = await createAdminClient();
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      console.log(user);

      // 設置 cookie
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 40,
      });

      return c.json({ data: user });
    } catch (error) {
      throw error;
    }
  })
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const { name, email, password } = c.req.valid('json');

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 40,
    });
    return c.json({ success: true });
  })
  .post('logout', sessionMiddleware, async (c) => {
    const account = c.get('account');
    deleteCookie(c, AUTH_COOKIE);

    await account.deleteSession('current');

    return c.json({ success: true });
  });

export default app;
