import Banner from 'components/favorites/banner';
import FavoritesList from './favoritesList';

export const metadata = {
  title: 'Game Collect | Favorites',
};

export default function Favorites() {
  return (
    <div className="mt-3 h-full" key={Math.random()}>
      <Banner />
      <p className="pl-3 pt-5 text-2xl font-semibold text-white">
        Your favorites
      </p>
      <FavoritesList />
    </div>
  );
}
