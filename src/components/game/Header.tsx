'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AddToCollection from './AddToCollection';
import { IGame } from 'types/game';
import FavoriteButton from 'components/button/FavoriteButton';

export default function Header({ game }: { game: IGame }) {
  const [scale, setScale] = useState(1);

  const handleScroll = () => {
    // Adjust the scaling factor based on your scroll logic
    const scrollFactor = 0.001; // You can adjust this value

    // Calculate the new scale based on the scroll position
    const newScale = 1 - window.scrollY * scrollFactor;

    // Ensure that the scale doesn't go below a minimum value
    const minScale = 0.75; // You can adjust this value
    setScale(Math.max(newScale, minScale));
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="relative h-56 overflow-hidden rounded-2xl">
        <Image
          width="2"
          height="20"
          className="mb-3 h-full w-full rounded-2xl object-cover blur-sm"
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots?.[0].image_id}.jpg`}
          alt={`${game.name} screenshot`}
        />
        <FavoriteButton id={game.id} />
      </div>
      <div
        className="align-items-center flex justify-evenly"
        style={{
          // i want to add margin bottom when the image is scaled
          // but i don't know how to do it
          marginBottom: `-${scale * 15}px`,
        }}
      >
        <div className="relative -mt-12 hidden h-24 w-24 rounded-full bg-navy-900 sm:block">
          <CircularProgressbarWithChildren
            value={Math.round(game.rating)}
            styles={{
              text: {
                fill: '#fff',
                fontSize: '1.6rem',
                fontWeight: 'bold',
              },
            }}
          >
            <div className="flex flex-col items-center justify-center text-white ">
              <p className="text-xl font-bold">
                {game?.rating ? Math.round(game.rating_count) : 0}
              </p>
              <p className="text-xs font-medium">Reviews</p>
            </div>
          </CircularProgressbarWithChildren>
        </div>

        <Image
          width="2"
          height="20"
          className="relative -mt-40 mb-3 h-full w-56 rounded-3xl border-8 border-navy-900"
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`}
          alt={`${game.name} cover`}
          style={{
            transform: `scale(${scale})`,
          }}
        />

        <AddToCollection game={game} />
      </div>
    </>
  );
}
