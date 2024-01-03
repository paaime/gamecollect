'use client';

import { useUser } from 'components/Providers';
import SmallCard from 'components/game/SmallCard';
import SmallCardLoading from 'components/game/loading/SmallCardLoading';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IGame } from 'types/game';

export default function FavoritesList() {
  const { updateFavorites } = useUser();
  const [favoritesList, setFavoritesList] = useState<IGame[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const updateFavoritesCustom = async (
    gameId: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    await updateFavorites(gameId, setLoading);
    setFavoritesList((prev) => prev.filter((game) => game.id !== gameId));
  };

  const getFavorites = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.DOMAIN}/api/favorites`);

      const data = await response.json();
      setFavoritesList(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="md:lg-grid-cols-3 mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
      {loading && (
        <>
          <SmallCardLoading />
          <SmallCardLoading />
          <SmallCardLoading />
        </>
      )}
      {favoritesList?.map((favorite, key) => (
        <SmallCard
          game={favorite}
          updateFavoritesCustom={updateFavoritesCustom}
          key={key}
        />
      ))}
      {!loading && favoritesList?.length < 1 && (
        <div className="col-span-12 flex flex-col items-center justify-center rounded-xl bg-navy-800 p-10 text-center">
          <p className="text-xl font-bold text-navy-700 dark:text-white">
            You don't have any favorites yet
          </p>
          <p className="text-md font-medium text-gray-600 dark:text-gray-400">
            Start adding some games to your favorites
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
  );
}
