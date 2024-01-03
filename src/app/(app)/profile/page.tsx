import Banner from 'components/profile/Banner';
import Password from 'components/profile/Password';
import AccountSettings from 'components/profile/AccountSettings';
import { headers } from 'next/headers';
import CollectionSettings from 'components/profile/CollectionSettings';
import Logout from 'components/profile/Logout';

export const metadata = {
  title: 'Game Collect | Profile',
};

async function getUser() {
  const response = await fetch(`/api/user/me`, {
    cache: 'no-cache',
    headers: headers(),
  });

  const data = await response.json();
  console.log(data);
  return data;
}

const ProfileOverview = async () => {
  const user = await getUser();
  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      <div className="mt-3 flex h-fit w-full flex-col gap-5">
        <div className="col-span-6 lg:!mb-0">
          <Banner user={user} />
        </div>
      </div>
      {/* all project & ... */}

      <div className="mb-4 grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 h-fit lg:col-span-6 lg:mb-0 3xl:col-span-6">
          <AccountSettings user={user} />
        </div>
        <div className="col-span-5 h-fit lg:col-span-6 lg:mb-0 3xl:col-span-6">
          <CollectionSettings user={user} />
        </div>
      </div>

      {user?.password && (
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Password />
        </div>
      )}
      <Logout />
    </div>
  );
};

export default ProfileOverview;
