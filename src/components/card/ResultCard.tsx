'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import Card from 'components/card';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from 'components/Providers';
import FavoriteButton from 'components/button/FavoriteButton';
import { IGame } from 'types/game';
import { AiOutlineLoading } from 'react-icons/ai';

const ResultCard = ({
  game,
  isCarousel,
  updateCollectionItemsCustom,
}: {
  game: IGame;
  isCarousel: boolean;
  updateCollectionItemsCustom?: (
    gameId: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isCollectionItem, updateCollectionItems } = useUser();

  let updateCollectionItemsTest =
    updateCollectionItemsCustom || updateCollectionItems;

  const isInCollection = isCollectionItem(game.id);
  return (
    <Card
      extra={`!p-4 3xl:p-![18px] break-inside-avoid transition duration-500 hover:scale-105 hover:!shadow-2xl h-fit`}
    >
      <Link href={`/game/${game.slug}`}>
        <div className="h-full w-full">
          <div className="relative w-full">
            <Image
              width="2"
              height="20"
              className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.png`}
              alt=""
            />
            <FavoriteButton id={game.id} />
          </div>

          <div className=" flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
            <div className="mb-3">
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                {game.name} {''}
                <span className="text-sm font-medium text-gray-600">
                  ({new Date(game.first_release_date * 1000).getFullYear()})
                </span>
              </p>
              <p className="mt-1 line-clamp-2 overflow-hidden text-ellipsis text-sm font-medium text-gray-600 md:mt-2">
                {game.platforms?.map((platform, key) =>
                  key === game.platforms.length - 1 ? (
                    <span key={key}>{platform.name}</span>
                  ) : (
                    <span key={key}>{platform.name} | </span>
                  ),
                )}
              </p>
            </div>
          </div>
          {!isCarousel && (
            <button
              className="linear w-full rounded-[12px] bg-brand-400 px-4 py-2 text-xs md:text-sm font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              onClick={(e) => {
                e.preventDefault();
                updateCollectionItemsTest(game.id, setLoading);
              }}
            >
              {loading ? (
                <div className="flex h-full w-full items-center justify-center px-10">
                  <AiOutlineLoading className="h-5 w-5 animate-spin" />
                </div>
              ) : isInCollection ? (
                'Remove'
              ) : (
                'Add to Collection'
              )}
            </button>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default ResultCard;
