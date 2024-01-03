'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay } from 'swiper/modules';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';
import SmallCardLoading from './SmallCardLoading';

export default function LoadingGameCarousel() {
  const [active, setActive] = useState(false);

  return (
    <div className="my-5 w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        className={`${active ? 'shadow-scroll' : 'shadow-scroll-right'} h-full`}
        modules={[Autoplay]}
        onProgress={() => {
          setActive(true);
        }}
        onSlideChange={() => {
          setActive(false);
        }}
      >
        <SwiperSlide className="!w-auto">
          <SmallCardLoading isCarousel={true} />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <SmallCardLoading isCarousel={true} />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <SmallCardLoading isCarousel={true} />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <SmallCardLoading isCarousel={true} />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <SmallCardLoading isCarousel={true} />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <SmallCardLoading isCarousel={true} />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <SmallCardLoading isCarousel={true} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
