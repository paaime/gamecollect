import Card from 'components/card';

const LoadingResultCard = () => {
  return (
    <Card extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white`}>
      <div className="h-full w-full animate-pulse">
        <div className="mb-3 h-52 w-full rounded-xl bg-navy-700"></div>
        <div className="mb-3 h-6 w-3/4 rounded-xl bg-navy-700"></div>
        <div className="mb-3 h-8 rounded-xl bg-navy-700"></div>
      </div>
    </Card>
  );
};

export default LoadingResultCard;
