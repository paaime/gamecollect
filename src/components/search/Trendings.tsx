import GameCarousel from 'components/game/GameCarousel';

async function getTrendings() {
  const response = await fetch(`/api/trendings`, {
    cache: 'no-cache',
  });

  const data = await response.json();
  return data;
}

const Trendings = async () => {
  const results = await getTrendings();

  return (
    <div>
      <p className="pl-3 pt-5 text-2xl font-semibold text-white">
        🔥 Trendings
      </p>
      <GameCarousel id={1} games={results} />
    </div>
  );
};

export default Trendings;
