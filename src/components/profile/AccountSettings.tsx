'use client';
import Card from 'components/card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';

const AccountSettings = ({ user }: { user: any }) => {
  const { update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user?.username);

  const saveChanges = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.DOMAIN}/api/user/settings/username`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_msg || 'Something went wrong');
      }

      toast.success('Settings updated successfully.');
      update();

      router.refresh();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card extra={'w-full p-6 h-full'}>
      <div className="mb-8 w-full">
        <p className="text-xl font-bold text-navy-700 dark:text-white">
          Account Settings
        </p>
        <p className="mt-2 text-base text-gray-600">
          Here you can change user account information
        </p>
      </div>
      {/* Settings form */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label className="ml-3 text-sm font-bold" htmlFor="">
            Username
          </label>
          <input
            className="rounded-2xl border border-navy-700 bg-navy-800 p-3 px-4 text-sm outline-none"
            type="text"
            placeholder="Your username"
            defaultValue={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      {/* Submit button */}
      <div className="mt-8 flex justify-end">
        <button
          className="animate rounded-2xl bg-brand-400 px-8 py-3 text-sm font-medium transition-all hover:bg-brand-500"
          onClick={saveChanges}
        >
          {loading ? (
            <div className="flex h-full w-full items-center justify-center px-10">
              <AiOutlineLoading className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </Card>
  );
};

export default AccountSettings;
