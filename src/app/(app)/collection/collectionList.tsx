'use client';

import { useUser } from 'components/Providers';
import ResultCard from 'components/card/ResultCard';
import LoadingResultCard from 'components/card/loading/LoadingResultCard';
import Numbers from 'components/collection/Numbers';
import SearchBar from 'components/collection/SearchBar';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IGame } from 'types/game';

export default function CollectionList() {
  const { updateCollectionItems } = useUser();
  const [collectionList, setCollectionList] = useState<IGame[]>();
  const [initialCollection, setInitialCollection] = useState<IGame[]>();
  const [loading, setLoading] = useState(true);

  const getCollection = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/collection`);

      const data = await response.json();
      setCollectionList(data.games);
      setInitialCollection(data.games);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  const updateCollectionItemsCustom = async (
    gameId: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    await updateCollectionItems(gameId, setLoading);
    setCollectionList((prev) => prev.filter((game) => game.id !== gameId));
    setInitialCollection((prev) => prev.filter((game) => game.id !== gameId));
  };

  return (
    <>
      <Numbers games={initialCollection} loading={loading} />
      <SearchBar
        collectionList={collectionList}
        setCollectionList={setCollectionList}
      />
      <h3
        className="my-8 ml-5
       text-2xl font-bold text-navy-700 dark:text-white"
      >
        Games in the Collection
      </h3>

      <div className="md:lg-grid-cols-3 mb-5 mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
        {loading ? (
          <>
            <LoadingResultCard />
            <LoadingResultCard />
            <LoadingResultCard />
          </>
        ) : (
          collectionList?.map((favorite, index) => (
            <ResultCard
              game={favorite}
              isCarousel={false}
              updateCollectionItemsCustom={updateCollectionItemsCustom}
              key={index}
            />
          ))
        )}
        {!loading && collectionList?.length < 1 && (
          <div className="col-span-12 flex flex-col items-center justify-center rounded-xl bg-navy-800 p-10 text-center">
            <p className="text-xl font-bold text-navy-700 dark:text-white">
              You don't have any games in your collection yet
            </p>
            <p className="text-md font-medium text-gray-600 dark:text-gray-400">
              Start adding some games to your collection
            </p>
            <Link
              href={'/search'}
              className="mt-5 rounded-md bg-navy-700 px-5 py-2 font-semibold text-white"
            >
              Search games
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
