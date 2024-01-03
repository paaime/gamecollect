export default function SmallCardLoading({
  isCarousel = false,
}: {
  isCarousel?: boolean;
}) {
  return (
    <div
      className={`flex h-52 flex-col items-end gap-5 rounded-xl bg-navy-800 p-5 sm:h-72 ${
        isCarousel ? 'w-72' : 'w-full'
      }`}
    >
      <div className="h-60 h-full w-full animate-pulse rounded-xl bg-navy-700"></div>
    </div>
  );
}
