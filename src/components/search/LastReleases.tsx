import GameCarousel from 'components/game/GameCarousel';

async function getLastRelease() {
  const response = await fetch(`${process.env.DOMAIN}/api/last_releases`, {
    cache: 'no-cache',
  });

  const data = await response.json();
  return data;
}

const LastReleases = async () => {
  const results = await getLastRelease();

  return (
    <div>
      <p className="pl-3 pt-5 text-2xl font-semibold text-white">
        Last Releases
      </p>
      <GameCarousel id={2} games={results} />
    </div>
  );
};

export default LastReleases;
