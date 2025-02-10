import AdminLayout from '@/components/layout/admin-layout';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  console.log('layout render');
  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
