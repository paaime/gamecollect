'use client';

import { FiSearch } from 'react-icons/fi';
import searchBanner from '/public/img/searchBanner.png';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBanner = ({ q }: { q?: string }) => {
  const router = useRouter();

  const [input, setInput] = useState(q);

  return (
    <div
      className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={{ backgroundImage: `url(${searchBanner.src})` }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Search, discover, and explore new games
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          Start searching for your favorites games and add them to your
          collection.
        </p>

        <div className="mt-[36px] flex h-10 items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <form
            className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white sm:w-1/2"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search?q=${input}`);
            }}
          >
            <p className="pl-3 pr-2 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search..."
              className="block h-full w-full w-full rounded-full bg-lightPrimary pr-3 text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900  dark:text-white dark:placeholder:!text-white"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
