'use client';
import { useUser } from 'components/Providers';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { IGame } from 'types/game';

const MobileAddToCollection = ({ game }: { game: IGame }) => {
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const collection = user?.collection;

  return (
    <button
      className="linear fixed bottom-[80px]  z-10 block w-full rounded-t-lg bg-brand-400 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800  active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90 sm:hidden"
      onClick={() => user.updateCollectionItems(game.id, setLoading)}
    >
      {loading ? (
        <div className="flex h-full w-full items-center justify-center px-10">
          <AiOutlineLoading className="h-5 w-5 animate-spin" />
        </div>
      ) : collection?.items.includes(game.id) ? (
        'Remove from collection'
      ) : (
        'Add to collection'
      )}
    </button>
  );
};

export default MobileAddToCollection;
