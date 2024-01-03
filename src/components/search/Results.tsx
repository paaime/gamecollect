import ResultCard from 'components/card/ResultCard';

async function getResults(q: string) {
  const response = await fetch(`${process.env.DOMAIN}/api/search?q=${q}`, {
    cache: 'no-cache',
  });

  const data = await response.json();
  return data;
}

const Results = async ({ q }: { q?: string }) => {
  const results = await getResults(q);

  return (
    // <CardsList type={'Results'}>
    <div>
      <h4 className="ml-5 mt-5 text-2xl font-bold text-navy-700 dark:text-white">
        Results for {q}
      </h4>
      <div className="md:lg-grid-cols-3 mb-5 mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
        {results.map((result, key) => (
          <ResultCard game={result} isCarousel={false} key={key} />
        ))}
      </div>
    </div>
    // </CardsList>
  );
};

export default Results;
