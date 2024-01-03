/* eslint-disable */
import { MdOutlineSearch, MdPerson } from 'react-icons/md';
import { FiAlignJustify } from 'react-icons/fi';

import { MdOutlineCollectionsBookmark } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { LiaSignInAltSolid } from 'react-icons/lia';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function MobileNavigation({ onOpenSidenav }: { onOpenSidenav: () => void }) {
  const session = useSession();
  const pathname = usePathname();

  const user = session?.data?.user;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  return (
    <div className="fixed bottom-0 z-10 flex h-20 w-full items-center justify-evenly border-t-2 border-navy-700 bg-navy-800  font-dm xl:hidden">
      <div
        className="flex cursor-pointer flex-col items-center gap-2 text-gray-600"
        onClick={() => onOpenSidenav()}
      >
        <FiAlignJustify className="h-6 w-6" />
        <span className="text-xs font-medium">Menu</span>
      </div>
      <Link
        href="/search"
        className={`flex flex-col items-center gap-2  ${
          activeRoute('/search') ? 'text-white' : 'text-gray-600'
        }`}
      >
        <MdOutlineSearch className="h-6 w-6" />
        <span className="text-xs font-medium">Search</span>
      </Link>
      <Link
        href="/collection"
        className={`flex flex-col items-center gap-2 ${
          activeRoute('/collection') ? 'text-white' : 'text-gray-600'
        }`}
      >
        <MdOutlineCollectionsBookmark className="h-6 w-6" />
        <span className="text-xs font-medium">Collection</span>
      </Link>
      <Link
        href="/profile"
        className={`flex flex-col items-center gap-2 ${
          activeRoute('/profile') ? 'text-white' : 'text-gray-600'
        }`}
      >
        <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-[#868CFF] to-brand-500 text-white">
          {user ? (
            <Image
              width="2"
              height="20"
              className="h-6 w-6 cursor-pointer rounded-full"
              src={user?.image}
              alt={user?.username}
            />
          ) : (
            <LiaSignInAltSolid className="h-5 w-5" />
          )}
        </div>
        <span className="text-xs font-medium">Profile</span>
      </Link>
    </div>
  );
}

export default MobileNavigation;
