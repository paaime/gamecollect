'use client';

import { signOut } from 'next-auth/react';
import { IoLogOutOutline } from 'react-icons/io5';

export default function Logout() {
  return (
    <button
      className="ml-auto flex h-full w-fit items-center gap-5 rounded-2xl bg-navy-800 px-4 py-3 text-sm font-medium text-white transition duration-500 hover:bg-navy-700"
      onClick={() => signOut()}
    >
      <IoLogOutOutline className="h-4 w-4 dark:text-white" />
      Log Out
    </button>
  );
}
