import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IGame } from 'types/game';

export default function SearchBar({
  collectionList,
  setCollectionList,
}: {
  collectionList: IGame[];
  setCollectionList: Dispatch<SetStateAction<IGame[]>>;
}) {
  const [search, setSearch] = useState<string>('');

  const filterCollection = () => {
    if (search === '') {
      setCollectionList(collectionList);
      return;
    }
    const filteredCollection = collectionList.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase()),
    );
    setCollectionList(filteredCollection);
  };

  useEffect(() => {
    filterCollection();
  }, [search]);

  return (
    <div className=" flex h-11 gap-5">
      <div className="flex h-full w-full items-center rounded-2xl border border-navy-700 bg-navy-800  text-navy-700">
        <p className="pl-3 pr-2 text-xl">
          <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
        </p>
        <input
          type="text"
          placeholder="Search..."
          className="block h-full w-full rounded-2xl bg-navy-800 text-sm font-medium text-navy-700 text-white outline-none placeholder:text-gray-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
