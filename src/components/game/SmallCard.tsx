import { IGame } from 'types/game';
import Link from 'next/link';
import FavoriteButton from 'components/button/FavoriteButton';

export default function SmallCard({
  game,
  isCarousel = false,
  updateFavoritesCustom,
}: {
  game: IGame;
  isCarousel?: boolean;
  updateFavoritesCustom?: (gameId: number, setLoading: any) => void;
}) {
  return (
    <Link
      href={`/game/${game.slug}`}
      className={`small-card relative flex h-52 items-end rounded-xl bg-center sm:h-72 ${
        isCarousel ? 'w-72' : 'w-full'
      }`}
      style={{
        background: `url("https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.png")`,
      }}
    >
      <FavoriteButton
        id={game.id}
        updateFavoritesCustom={updateFavoritesCustom}
      />
      <p
        className="w-full rounded-b-xl p-4 text-xl font-bold text-white"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.7) 50%)',
        }}
      >
        {game.name}
      </p>
    </Link>
  );
}
