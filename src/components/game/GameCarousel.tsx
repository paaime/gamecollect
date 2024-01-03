'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';
import SmallCard from './SmallCard';
import { IGame } from 'types/game';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function GameCarousel({
  id = 1,
  games,
}: {
  id: number;
  games: IGame[];
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="group my-5 flex w-full items-center">
      <div
        className={`game-carousel-prev-${id} z-10 -ml-[15px] -mr-[17px] hidden h-8 w-8 items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer group-hover:flex`}
      >
        <IoIosArrowBack style={{ fill: 'black' }} />
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        className={`${active ? 'shadow-scroll' : 'shadow-scroll-right'} h-full`}
        navigation={{
          prevEl: `.game-carousel-prev-${id}`,
          nextEl: `.game-carousel-next-${id}`,
        }}
        modules={[Autoplay, Navigation]}
        onProgress={() => {
          setActive(true);
        }}
        onSlideChange={() => {
          setActive(false);
        }}
      >
        {games.map((game, key) => (
          <SwiperSlide className="!w-auto" key={key}>
            <SmallCard game={game} isCarousel={true} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`game-carousel-next-${id} z-10 -ml-[17px] -mr-[15px] flex hidden h-8 w-8 items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer group-hover:flex`}
      >
        <IoIosArrowForward style={{ fill: 'black' }} />
      </div>
    </div>
  );
}
