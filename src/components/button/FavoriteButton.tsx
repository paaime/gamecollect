import { useUser } from 'components/Providers';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

export default function FavoriteButton({
  id,
  updateFavoritesCustom,
}: {
  id: number;
  updateFavoritesCustom?: (gameId: number, setLoading: any) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { isFavorite, updateFavorites } = useUser();

  const updateFavoritesTest = updateFavoritesCustom || updateFavorites;

  const isInFavorites = isFavorite(id);

  return (
    <button
      className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        updateFavoritesTest(id, setLoading);
      }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <AiOutlineLoading className="h-full w-full animate-spin" />
          </div>
        ) : isInFavorites ? (
          <IoHeart className="text-red-500" />
        ) : (
          <IoHeartOutline />
        )}
      </div>
    </button>
  );
}
