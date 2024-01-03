'use client';
import Card from 'components/card';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEdit, AiOutlineLoading } from 'react-icons/ai';

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const Banner = ({ user }: { user: any }) => {
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const uploadProfilePicture = async (e: any) => {
    try {
      setLoading(true);
      const file = e.target.files[0];

      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        throw new Error('Only png and jpeg files are allowed');
      }

      const formData = new FormData();
      const image = await convertBase64(file);
      formData.append('file', file);

      const response = await fetch(
        `${process.env.DOMAIN}/api/user/settings/profile_picture`,
        {
          method: 'POST',
          headers: {
            'Content-Type': file.type,
          },
          body: JSON.stringify({ image }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_msg || 'Something went wrong');
      }

      router.refresh();

      toast.success('Profile picture updated successfully.');
      update();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
      {/* Background and profile */}

      <div className="relative h-44 w-full overflow-hidden rounded-2xl">
        <Image
          width="2"
          height="20"
          className="mb-3 h-full w-full rounded-2xl object-cover blur"
          src={`${user?.image}`}
          alt={`user banner`}
        />
      </div>
      <div className="align-items-center -mt-28 mb-3 flex justify-evenly">
        <div className="group relative bg-navy-900 rounded-full">
          <Image
            width="2"
            height="20"
            className="relative  h-full w-48 rounded-full border-8 border-navy-900"
            src={`${user?.image}`}
            alt={`user profile picture`}
          />
          <div className="absolute inset-0 hidden cursor-pointer items-center justify-center rounded-full bg-navy-800 bg-opacity-50  group-hover:flex">
            <AiOutlineEdit className="h-8 w-8 text-white" />
          </div>
          <input
            type="file"
            className="absolute -mt-48 h-full w-48 cursor-pointer opacity-0"
            onChange={uploadProfilePicture}
          />
          {loading && (
            <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-navy-800 bg-opacity-50  group-hover:flex">
              <AiOutlineLoading className="h-10 w-10 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Name and position */}
      <div className="mb-2 mt-2 flex flex-col items-center">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          {user.username}
        </h4>
        <h5 className="mt-2 text-base font-normal text-gray-600">
          Created {new Date(user.createdAt).toLocaleDateString()}
        </h5>
      </div>
    </Card>
  );
};

export default Banner;
