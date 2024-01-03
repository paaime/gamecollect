'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Mousewheel, Navigation } from 'swiper/modules';
import Card from 'components/card';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type Screenshot = {
  id: number;
  image_id: string;
};

type Video = {
  id: number;
  game: number;
  name: string;
  video_id: string;
  checksum: string;
};

const CarouselCard = ({
  data,
  setIndex,
  index,
}: {
  data: Screenshot | Video;
  setIndex: Dispatch<SetStateAction<number>>;
  index: number;
}) => {
  const [activeVideo, setActiveVideo] = useState(false);

  if ('image_id' in data) {
    return (
      <Card extra="h-full p-4">
        <Image
          width="2"
          height="20"
          className="h-full w-auto rounded-2xl"
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${data.image_id}.jpg`}
          alt=""
          onClick={() => {
            setIndex(index);
          }}
        />
      </Card>
    );
  } else {
    return (
      <Card extra="h-full p-4">
        <div
          className="flex h-full w-auto items-center justify-center rounded-2xl"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${data.video_id}/maxresdefault.jpg)`,
            backgroundSize: 'cover',
            display: activeVideo ? 'none' : 'flex',
          }}
          onClick={() => {
            setActiveVideo(true);
          }}
        >
          <div className="rounded-2xl bg-gray-900/90 px-6 py-4">
            <FaPlay className="text-white" />
          </div>
        </div>
        {/* <Image
          width="2"
          height="20"
          className="h-full w-auto rounded-2xl"
          src={`https://img.youtube.com/vi/${data.video_id}/maxresdefault.jpg`}
          alt=""
          onClick={() => {
            setIndex(index);
          }}
        /> */}
        <iframe
          id="existing-iframe-example"
          width="360"
          height="360"
          src={`https://www.youtube.com/embed/${data.video_id}?controls=1&modestbranding=1&rel=0&showinfo=0&loop=0&fs=1&hl=en&iv_load_policy=3&enablejsapi=1`}
          allow="fullscreen;"
          className="rounded-2xl"
          style={{
            // opacity: 0,
            height: activeVideo ? '100%' : '0',
          }}
        ></iframe>
      </Card>
    );
  }
};

export default function Carousel({
  videos,
  screenshots,
}: {
  videos: Video[];
  screenshots: Screenshot[];
}) {
  const [index, setIndex] = useState(-1);
  const [active, setActive] = useState(false);

  const slides = screenshots?.map((screenshot: any) => {
    return {
      id: `${screenshot.id}`,
      src: `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`,
    };
  });

  return (
    <div className="group my-5 flex h-52 w-full items-center">
      <div
        className={`photo-carousel-prev z-10 -ml-[15px] -mr-[17px] hidden h-8 w-8 items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer group-hover:flex`}
      >
        <IoIosArrowBack style={{ fill: 'black' }} />
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className={`${active ? 'shadow-scroll' : 'shadow-scroll-right'} h-full`}
        navigation={{
          prevEl: `.photo-carousel-prev`,
          nextEl: `.photo-carousel-next`,
        }}
        modules={[Autoplay, Navigation]}
        onProgress={() => {
          setActive(true);
        }}
        onSlideChange={() => {
          setActive(false);
        }}
      >
        {videos?.map((video: Video, key: number) => {
          return (
            <SwiperSlide className="!w-auto" key={key}>
              <CarouselCard data={video} setIndex={setIndex} index={key} />
            </SwiperSlide>
          );
        })}
        {screenshots?.map((screenshot: Screenshot, key: number) => {
          return (
            <SwiperSlide className="!w-auto" key={key}>
              <CarouselCard data={screenshot} setIndex={setIndex} index={key} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
      <div
        className={`photo-carousel-next z-10 -ml-[17px] -mr-[15px] flex hidden h-8 w-8 items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer group-hover:flex`}
      >
        <IoIosArrowForward style={{ fill: 'black' }} />
      </div>
    </div>
  );
}
