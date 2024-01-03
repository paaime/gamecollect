'use client';

import Banner from 'components/profile/Banner';
import Password from 'components/profile/Password';
import AccountSettings from 'components/profile/AccountSettings';
import CollectionSettings from 'components/profile/CollectionSettings';
import Logout from 'components/profile/Logout';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from './Loading';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/me`, {
        cache: 'no-cache',
      });

      const data = await response.json();
      setUser(data);
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      <div className="mt-3 flex h-fit w-full flex-col gap-5">
        <div className="col-span-6 lg:!mb-0">
          <Banner user={user} setUser={setUser} />
        </div>
      </div>
      {/* all project & ... */}

      <div className="mb-4 grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 h-fit lg:col-span-6 lg:mb-0 3xl:col-span-6">
          <AccountSettings user={user} setUser={setUser} />
        </div>
        <div className="col-span-5 h-fit lg:col-span-6 lg:mb-0 3xl:col-span-6">
          <CollectionSettings user={user} />
        </div>
      </div>

      {/* {user?.password && (
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Password />
        </div>
      )} */}
    </div>
  );
};

export default Profile;
