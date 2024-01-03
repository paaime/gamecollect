import { PropsWithChildren } from 'react';

// Layout components
import React from 'react';

// Custom Chakra theme

export const metadata = {
  title: 'Game Collect | Sign in',
  description: 'A game collection app',
};

interface AuthProps extends PropsWithChildren {}

export default function AuthLayout({ children }: AuthProps) {
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full dark:!bg-navy-900">
        <main className={`mx-auto min-h-screen`}>{children}</main>
      </div>
    </div>
  );
}
