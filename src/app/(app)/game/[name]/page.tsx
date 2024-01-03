// 'use client';
import BarChart from 'components/charts/BarChart';
import Actions from 'components/game/Actions';
import Carousel from 'components/game/Carousel';
import GameCarousel from 'components/game/GameCarousel';
import Header from 'components/game/Header';
import InfoList from 'components/game/InfoList';
import MobileAddToCollection from 'components/game/MobileAddToCollection';
import Websites from 'components/game/Websites';
import { IGame } from 'types/game';
import { barChartDataDailyTraffic } from 'variables/charts';
import { barChartOptionsDailyTraffic } from 'variables/charts';

export async function generateMetadata({ params, searchParams }) {
  const game = params.name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  return { title: `Game Collect | ${game}` };
}

async function getGame(name: string) {
  const response = await fetch(`${process.env.DOMAIN}/api/game?name=${name}`, {
    cache: 'no-cache',
  });

  const data = await response.json();
  return data;
}

export default async function Game({
  params,
}: {
  params: {
    name: string;
  };
}) {
  const game: IGame = await getGame(params.name);

  return (
    <div className="mt-3 h-full">
      <Header game={game} />
      <div className="flex flex-col items-center justify-between gap-3  px-4 py-10">
        <h3 className="ml-1 text-center text-3xl font-bold text-navy-700 dark:text-white">
          {game.name}
        </h3>
        <p className="text-md  font-medium text-gray-600 ">
          {new Date(game.first_release_date * 1000).toLocaleDateString()}
        </p>

        <MobileAddToCollection game={game} />
      </div>
      {game.websites?.length > 0 && <Websites websites={game.websites} />}

      <div className="h-full w-full rounded-xl bg-navy-800 p-10">
        <p className="text-xl font-semibold text-white">Summary</p>
        <p className="text-md  py-5 font-medium text-gray-600">
          {game.summary}
        </p>
        <div className="flex flex-wrap">
          <div className="flex flex-col  flex-wrap  pr-10 md:flex-row">
            <div>
              <p className=" text-xl font-semibold text-white">Genre</p>
              <div className="flex flex-wrap gap-3 py-5 pr-8">
                {game.genres?.map((genre, key) => (
                  <p
                    className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-gray-600"
                    key={key}
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className=" text-xl font-semibold text-white">Platforms</p>
              <div className="flex flex-wrap gap-3 py-5">
                {game.platforms?.map((platform, key) => (
                  <p
                    className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-gray-600"
                    key={key}
                  >
                    {platform.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className=" text-xl font-semibold text-white">Made by</p>
            <div className="flex flex-wrap gap-3 py-5">
              {game.involved_companies?.map((involved_companie, key) => (
                <p
                  className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-gray-600"
                  key={key}
                >
                  {involved_companie.company.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Carousel videos={game.videos} screenshots={game.screenshots} />
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="w-100 flex flex-col lg:w-4/6">
          <div className="rounded-xl bg-navy-800 p-10">
            <p className="text-xl font-semibold text-white">
              Price details{' '}
              <span className="ml-2 text-sm font-medium text-gray-600">
                (coming soon...)
              </span>
            </p>
            <div className="blur-md">
              <BarChart
                chartData={barChartDataDailyTraffic}
                chartOptions={barChartOptionsDailyTraffic}
              />
            </div>
          </div>
          {game.similar_games?.length > 0 && (
            <>
              <p className="pl-3 pt-5 text-2xl font-semibold text-white">
                Similar Games
              </p>
              <GameCarousel id={1} games={game.similar_games} />
            </>
          )}
          {game?.storyline && (
            <div className="rounded-xl bg-navy-800 p-10">
              <p className="text-xl font-semibold text-white">Story</p>
              <p className="text-md  py-5 font-medium text-gray-600">
                {game.storyline}
              </p>
            </div>
          )}
        </div>
        <div className="flex w-full flex-col gap-5 lg:w-2/6">
          <div className="h-fit w-full rounded-xl bg-navy-800 p-10 ">
            <p className="pb-5 text-xl font-semibold text-white">Details</p>
            {game.themes?.length > 0 && (
              <InfoList title="Themes" list={game.themes} />
            )}
            {game.genres?.length > 0 && (
              <InfoList title="Genres" list={game.genres} />
            )}
            {game.franchises?.length > 0 && (
              <InfoList title="Franchises" list={game.franchises} />
            )}
            {game.collections?.length > 0 && (
              <InfoList title="Collections" list={game.collections} />
            )}
            {game.player_perspectives?.length > 0 && (
              <InfoList
                title="Player Perspectives"
                list={game.player_perspectives}
              />
            )}
            {game.game_engines?.length > 0 && (
              <InfoList title="Game Engines" list={game.game_engines} />
            )}
            {game.game_modes?.length > 0 && (
              <InfoList title="Game Modes" list={game.game_modes} />
            )}
          </div>
          <Actions game={game} />
        </div>
      </div>
    </div>
  );
}
