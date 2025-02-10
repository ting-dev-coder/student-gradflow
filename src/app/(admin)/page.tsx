import { redirect } from 'next/navigation';
import { getCurrent } from '../(auth)/actions';

export default async function Home() {
  console.log('herer');
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  redirect('/dashboard');
}
