import LoadingResultCard from 'components/card/loading/LoadingResultCard';

const LoadingResults = ({
  q,
  loading,
  title,
}: {
  q?: string;
  loading?: boolean;
  title: string;
}) => {
  return (
    <div>
      <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          {title}
        </h4>
      </div>
      <div className="md:lg-grid-cols-3 mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 mb-5">
        <>
          <LoadingResultCard />
          <LoadingResultCard />
          <LoadingResultCard />
        </>
      </div>
    </div>
  );
};

export default LoadingResults;
