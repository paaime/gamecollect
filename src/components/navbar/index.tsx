import React, { useState } from 'react';
import Dropdown from 'components/dropdown';
import NavLink from 'components/link/NavLink';
import { FiSearch } from 'react-icons/fi';
import { LiaSignInAltSolid } from 'react-icons/lia';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: string;
  [x: string]: any;
}) => {
  const { brandText, secondary } = props;
  const session = useSession();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const user = session?.data?.user;

  return (
    <nav className="sticky top-0 z-40 -ml-[10px] flex w-screen flex-row flex-wrap items-center justify-between  bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d] md:top-4 md:-ml-0 md:w-auto md:rounded-xl">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {' '}
              /{' '}
            </span>
          </a>
          <NavLink
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </NavLink>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {secondary ? secondary : brandText}
          </NavLink>
        </p>
      </div>

      <div className="relative mt-[3px] hidden h-[61px] w-[300px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex md:w-[305px] md:flex-grow-0 md:gap-1 xl:w-[305px] xl:gap-2">
        <form
          className="flex h-full w-[225px] items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?q=${search}`);
          }}
        >
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {/* <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span> */}
        {/* start Notification */}
        {/* <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          classNames={'py-2 top-4 -left-[230px] md:-left-[440px] w-max'}
        >
          <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-navy-700 dark:text-white">
                Notification
              </p>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Mark all read
              </p>
            </div>

            <button className="flex w-full items-center">
              <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                <BsArrowBarUp />
              </div>
              <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                  A new update for your downloaded item is available!
                </p>
              </div>
            </button>

            <button className="flex w-full items-center">
              <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                <BsArrowBarUp />
              </div>
              <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                  A new update for your downloaded item is available!
                </p>
              </div>
            </button>
          </div>
        </Dropdown> */}
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            user ? (
              <Image
                width="2"
                height="20"
                className="h-10 w-10 cursor-pointer rounded-full"
                src={`${user?.image}`}
                alt={user?.username}
              />
            ) : (
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-[#868CFF] to-brand-500 text-white">
                <LiaSignInAltSolid className="h-6 w-6" />
              </div>
            )
          }
          classNames={'py-2 top-8 -left-[180px]'}
        >
          <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-5 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="ml-4 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  {user ? '👋 Hey, ' + user?.username : 'You are not logged in'}
                </p>{' '}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="ml-4 mt-3 flex flex-col">
              {user ? (
                <>
                  <a
                    href="/profile"
                    className="text-sm text-gray-800 hover:underline dark:text-white hover:dark:text-white"
                  >
                    Profile Settings
                  </a>
                  <p
                    onClick={() => {
                      signOut();
                    }}
                    className="mt-3 cursor-pointer text-sm font-medium text-red-500 hover:text-red-500 hover:underline"
                  >
                    Log Out
                  </p>
                </>
              ) : (
                <>
                  <a
                    href="/auth/sign-in"
                    className="text-sm text-gray-800 hover:underline dark:text-white hover:dark:text-white"
                  >
                    Sign In
                  </a>
                </>
              )}
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
