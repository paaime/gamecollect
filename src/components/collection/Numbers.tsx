import { IGame } from 'types/game';

export default function Numbers({
  games,
  loading,
}: {
  games: IGame[];
  loading: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-screen-md">
      <div className="mx-auto flex w-full items-center justify-around rounded-2xl bg-navy-800 p-7 md:w-3/4">
        <div className="flex flex-col gap-2 text-center">
          {loading ? (
            <p className="h-10 w-full animate-pulse rounded-xl bg-navy-700 text-4xl font-bold"></p>
          ) : (
            <p className="text-4xl font-bold  text-white ">
              {games?.length ? games.length : 0}
            </p>
          )}
          <p className="text-gray text-sm font-medium text-gray-500">Games</p>
        </div>
        <div className="flex h-16 w-px bg-gray-800"></div>
        <div className="flex flex-col gap-2 text-center">
          <p className="text-4xl font-bold  text-white blur-md">28$</p>
          <p className="text-gray text-sm font-medium text-gray-500">Price</p>
        </div>
      </div>
    </div>
  );
}
