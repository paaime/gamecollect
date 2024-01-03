'use client';
// Layout components
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import routes from 'routes';
import {
  getActiveGame,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';
import React from 'react';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';
import Footer from 'components/footer/Footer';
import MobileNavigation from 'components/mobileNavigation';

export default function Admin({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';
  document.body.classList.add('dark');
  return (
    <div className="mb-[50px] flex h-full w-full bg-background-100 dark:bg-background-900 lg:mb-[0px]">
      <MobileNavigation onOpenSidenav={() => setOpen(!open)} />
      {open && (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-white/10 backdrop-blur-md"></div>
      )}
      <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin" />
      {/* Navbar & Main Content */}
      <div className="h-full w-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[340px]`}
        >
          {/* Routes */}
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              brandText={getActiveRoute(routes, pathname)}
              secondary={getActiveGame(routes, pathname)}
            />
            <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
              {children}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
