/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import SidebarCard from 'components/sidebar/components/SidebarCard';
import { IRoute } from 'types/navigation';
import Image from 'next/image';

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex h-full flex-col overflow-hidden bg-white pb-10 shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 lg:m-4 lg:h-[calc(100vh-35px)] lg:rounded-3xl ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
      style={{ width: '300px' }}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className={`flex-column mx-auto mt-[30px] flex flex items-center`}>
        <Image src={'/img/logo.png'} alt="test" width={100} height={100} />
        <h1 className="ml-1 mt-1 flex w-min flex-col text-[30px] font-extrabold leading-7 text-navy-700 dark:text-white">
          Game<span className="ml-2">Collect</span>
        </h1>
      </div>
      <div className="mx-auto mb-7 mt-[25px] h-px w-5/6 bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      <div className="flex justify-center">
        <SidebarCard />
      </div>

      {/* Nav item end */}
    </div>
  );
}

export default SidebarHorizon;
