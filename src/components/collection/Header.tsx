'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

export default function Header() {
  const [scale, setScale] = useState(1);
  const session = useSession();

  const user = session?.data?.user;

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
      <div className="relative h-44 overflow-hidden rounded-2xl">
        <Image
          width="2"
          height="20"
          className="mb-3 h-full w-full rounded-2xl object-cover blur"
          src={`${user?.image}`}
          alt={`user banner`}
        />
      </div>
      <div
        className="align-items-center flex justify-evenly "
        style={{
          // i want to add margin bottom when the image is scaled
          // but i don't know how to do it
          marginBottom: `-${scale * 15}px`,
        }}
      >
        <Image
          width="2"
          height="20"
          className="relative -mt-28 mb-3 h-full w-48 rounded-full border-8 border-navy-900 bg-navy-900"
          src={`${user?.image}`}
          alt={`user profile picture`}
          style={{
            transform: `scale(${scale})`,
          }}
        />
      </div>
      <h3 className="my-8 text-center text-4xl font-bold text-navy-700 dark:text-white">
        {user?.username}'s Collection
      </h3>
    </>
  );
}
