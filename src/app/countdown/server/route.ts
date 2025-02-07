/**
 * 
 * .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image } = c.req.valid("form");

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID!,
        WORKSPACES_ID!,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(6),
        }
      );

      // create an member
      const member = await databases.createDocument(
        DATABASE_ID,
        MEMBERS_ID,
        ID.unique(),
        {
          workspaceId: workspace.$id,
          userId: user.$id,
          role: MemberRole.ADMIN,
        }
      );

      return c.json({ data: workspace });
    }
  );
 */

import { COUNTDOWN_ID, DATABASE_ID, IMAGES_BUCKET_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { createCountdownSchema } from '../schemas';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    const countdownList = await databases.listDocuments(
      DATABASE_ID,
      COUNTDOWN_ID,
      [Query.equal('userId', user.$id)]
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
    zValidator('form', createCountdownSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');
      const storage = c.get('storage');

      const { name, endAt, image, localImagePath } = c.req.valid('form');

      let uploadedImageUrl: string = '';

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString('base64')}`;
      }

      const res = await databases.createDocument(
        DATABASE_ID,
        COUNTDOWN_ID,
        'unique()',
        {
          name,
          endAt: endAt.toISOString(),
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          localImagePath: localImagePath || null,
          // created_at: new Date().toISOString(),
        }
      );
      return c.json({ data: { document: [] } });
    }
  )
  .delete(':countdownId', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    const { countdownId } = c.req.param();

    // check if the data exit and check if it belongs to the current user
    const event = await databases.getDocument(
      DATABASE_ID,
      COUNTDOWN_ID,
      countdownId
    );

    if (event.userId !== user.$id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const res = await databases.deleteDocument(
      DATABASE_ID,
      COUNTDOWN_ID,
      countdownId
    );

    return c.json({ data: res });
  });

export default app;
