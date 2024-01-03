import { headers } from 'next/headers';
import Profile from 'components/profile/Profile';

export const metadata = {
  title: 'Game Collect | Profile',
};

async function getUser() {
  const response = await fetch(`${process.env.DOMAIN}/api/user/me`, {
    cache: 'no-cache',
    headers: headers(),
  });

  const data = await response.json();
  console.log(data);
  return data;
}

const ProfileOverview = async () => {
  const user = await getUser();
  return <Profile />;
};

export default ProfileOverview;
