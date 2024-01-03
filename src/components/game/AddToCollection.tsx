'use client';

import { useUser } from 'components/Providers';
import LoadingCircle from 'components/LoadingCircle';
import { MdAddToPhotos, MdLibraryAddCheck } from 'react-icons/md';
import { IGame } from 'types/game';
import { useState } from 'react';

export default function AddToCollection({ game }: { game: IGame }) {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();

  const collection = user?.collection;

  return (
    <div
      className="relative -mt-12 hidden h-24 w-24 cursor-pointer justify-center rounded-full bg-navy-900 text-xl text-white sm:flex"
      style={{ boxShadow: 'rgba(255, 255, 255, 0.4) 0px 4px 4px inset' }}
      onClick={() => user.updateCollectionItems(game.id, setLoading)}
    >
      {loading ? (
        <LoadingCircle />
      ) : collection?.items.includes(game.id) ? (
        <MdLibraryAddCheck
          className="self-center"
          style={{ fontSize: '2rem' }}
        />
      ) : (
        <MdAddToPhotos className="self-center" style={{ fontSize: '2rem' }} />
      )}
    </div>
  );
}
