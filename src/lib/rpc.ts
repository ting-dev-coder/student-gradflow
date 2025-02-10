import { hc } from 'hono/client';
import { AppType } from '@/app/(admin)/api/[[...route]]/route';

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
