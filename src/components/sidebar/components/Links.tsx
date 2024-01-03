/* eslint-disable */
import React from 'react';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import DashIcon from 'components/icons/DashIcon';
import { signOut, useSession } from 'next-auth/react';
import { MdLock, MdPerson } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const session = useSession();

  const user = session?.data?.user;
  // Chakra color mode
  const pathname = usePathname();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  const createLinks = (routes: RoutesType[]) => {
    let routesItems = routes.map((route, index) => {
      if (
        route.layout === '/admin' ||
        route.layout === '/auth' ||
        route.layout === '/rtl' ||
        route.layout === ''
      ) {
        return (
          <NavLink key={index} href={route.layout + '/' + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? 'font-bold text-brand-500 dark:text-white'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{' '}
                </span>
                {/* <span className="relative flex h-3 w-3">
                  <span className="bg-sky-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-sky-500 relative inline-flex h-3 w-3 rounded-full"></span>
                </span> */}
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? 'font-bold text-navy-700 dark:text-white'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </NavLink>
        );
      }
    });

    if (user) {
      routesItems.push(
        <NavLink key={routesItems.length} href="/profile">
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span
                className={`${
                  activeRoute('/profile') === true
                    ? 'font-bold text-brand-500 dark:text-white'
                    : 'font-medium text-gray-600'
                }`}
              >
                <MdPerson className="h-6 w-6" />
              </span>
              {/* <span className="relative flex h-3 w-3">
                <span className="bg-sky-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-sky-500 relative inline-flex h-3 w-3 rounded-full"></span>
              </span> */}
              <p
                className={`leading-1 ml-4 flex ${
                  activeRoute('/profile') === true
                    ? 'font-bold text-navy-700 dark:text-white'
                    : 'font-medium text-gray-600'
                }`}
              >
                Profile
              </p>
            </li>
            {activeRoute('/profile') ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            ) : null}
          </div>
        </NavLink>,
      );
      routesItems.push(
        <button onClick={() => signOut()}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span className={`-mr-[3px] ml-[3px] font-medium text-gray-600`}>
                <IoLogOutOutline className="h-6 w-6" />
              </span>
              <p className={`leading-1 ml-4 flex font-medium text-gray-600`}>
                Logout
              </p>
            </li>
          </div>
        </button>,
      );
    } else {
      routesItems.push(
        <NavLink key={routesItems.length} href="/profile">
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span className={`text-gray-600'} font-medium`}>
                <MdLock className="h-6 w-6" />
              </span>
              <p className={`leading-1 ml-4 flex font-medium text-gray-600`}>
                Sign In
              </p>
            </li>
          </div>
        </NavLink>,
      );
    }

    return routesItems;
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
