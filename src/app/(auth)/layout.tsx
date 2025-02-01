import { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@mantine/core';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          {/* <Image src="/logo.svg" width={152} height={56} alt="logo" /> */}
          <Button variant="secondary">Sign up</Button>
        </nav>

        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
