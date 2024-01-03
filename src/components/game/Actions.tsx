'use client';
import { useUser } from 'components/Providers';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoHeartOutline, IoShareSocial } from 'react-icons/io5';
import { MdAddToPhotos } from 'react-icons/md';
import { IGame } from 'types/game';

export default function Actions({ game }: { game: IGame }) {
  const [collectionLoading, setCollectionLoading] = useState<boolean>(false);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
  const {
    isCollectionItem,
    isFavorite,
    updateCollectionItems,
    updateFavorites,
  } = useUser();

  const isInCollection = isCollectionItem(game?.id);
  const isInFavorites = isFavorite(game?.id);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="h-fit w-full rounded-xl bg-navy-800 p-10 ">
      <p className="pb-5 text-xl font-semibold text-white">Actions</p>
      <div className="flex flex-col gap-5">
        <button
          className="flex h-full items-center gap-5 rounded-2xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm font-medium text-gray-400  transition duration-500 hover:bg-navy-700"
          onClick={(e) => {
            e.preventDefault();
            updateCollectionItems(game.id, setCollectionLoading);
          }}
        >
          <MdAddToPhotos className="h-4 w-4 text-gray-400 dark:text-white" />
          {collectionLoading ? (
            <div className="flex h-4 w-4 items-center justify-center">
              <AiOutlineLoading className="h-full w-full animate-spin" />
            </div>
          ) : isInCollection ? (
            'Remove from collection'
          ) : (
            'Add to collection'
          )}
        </button>
        <button
          className="flex h-full items-center gap-5 rounded-2xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm font-medium text-gray-400  transition duration-500 hover:bg-navy-700"
          onClick={(e) => {
            e.preventDefault();
            updateFavorites(game.id, setFavoriteLoading);
          }}
        >
          <IoHeartOutline className="h-4 w-4 text-gray-400 dark:text-white" />

          {favoriteLoading ? (
            <div className="flex h-4 w-4 items-center justify-center">
              <AiOutlineLoading className="h-full w-full animate-spin" />
            </div>
          ) : isInFavorites ? (
            'Remove from favorites'
          ) : (
            'Add to favorites'
          )}
        </button>
        <button
          className="flex h-full items-center gap-5 rounded-2xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm font-medium text-gray-400  transition duration-500 hover:bg-navy-700"
          onClick={copyToClipboard}
        >
          <IoShareSocial className="h-4 w-4 text-gray-400 dark:text-white" />
          Share
        </button>
      </div>
    </div>
  );
}
