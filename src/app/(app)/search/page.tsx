import Results from 'components/search/Results';
import SearchBanner from './searchBanner';
import { Suspense } from 'react';
import LoadingResults from 'components/search/LoadingResults';
import LastReleases from 'components/search/LastReleases';
import Trendings from 'components/search/Trendings';
import LoadingGameCarousel from 'components/game/loading/LoadingGameCarousel';

export const metadata = {
  title: 'Game Collect | Search',
};

async function getResults(q: string) {
  const response = await fetch(`${process.env.DOMAIN}/api/search?q=${q}`, {
    cache: 'no-cache',
  });

  const data = await response.json();
  return data;
}

const Search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  return (
    <div className="mt-3 h-full" key={Math.random()}>
      <SearchBanner q={q} />

      {q?.length > 0 && (
        <Suspense fallback={<LoadingResults title={`Results for ${q}`} />}>
          {/* @ts-expect-error Server Component */}
          <Results q={q} />
        </Suspense>
      )}

      <Suspense
        fallback={
          <>
            <h4 className="ml-1 pl-3 pt-5 text-2xl font-bold text-navy-700 dark:text-white">
              🔥 Trendings
            </h4>
            <LoadingGameCarousel />
          </>
        }
      >
        {/* @ts-expect-error Server Component */}
        <Trendings />
      </Suspense>
      <Suspense
        fallback={
          <>
            <h4 className="ml-1 pl-3 pt-5 text-2xl font-bold text-navy-700 dark:text-white">
              Last Releases
            </h4>
            <LoadingGameCarousel />
          </>
        }
      >
        {/* @ts-expect-error Server Component */}
        <LastReleases />
      </Suspense>
    </div>
  );
};

export default Search;
