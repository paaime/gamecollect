import Link from 'next/link';

const Banner = () => {
  return (
    <div
      className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={{
        backgroundImage: `url("https://horizon-ui.com/chakra-pro/static/media/OverviewBanner.1fd0acf2b1acd813cd54.png")`,
      }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Favorites Games Overview
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          This is your favorites games overview. You can also add games to your
          collection and discover new games.
        </p>
      </div>
      <div className="flex items-center gap-10">
        <Link
          href={'/collection'}
          className="rounded-xl bg-white px-5 py-2 font-medium transition hover:bg-[#E3DAFF]"
        >
          My collection
        </Link>
        <Link href={'/search'} className="font-medium text-white">
          Discover
        </Link>
      </div>
    </div>
  );
};

export default Banner;
