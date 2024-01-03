export default async function Loading() {
  return (
    <div className="mt-3 h-full">
      {/* Header */}
      <div className="relative h-56 overflow-hidden rounded-2xl">
        <div className="roundex-2xl mb-3 h-full w-full bg-navy-700 blur-sm" />
      </div>
      <div className="align-items-center -mt-36 flex h-60 justify-evenly">
        <div className="relative  mb-3 h-full w-52  rounded-3xl border-8 border-navy-900 bg-navy-800" />
      </div>
      {/* Title and date */}
      <div className="flex animate-pulse flex-col justify-between gap-3 px-4 py-10 md:items-center">
        <h3 className="ml-1 h-6 w-80 rounded-lg bg-navy-700 text-3xl font-bold dark:text-white"></h3>
        <p className="text-md h-5 w-72 rounded-lg bg-navy-700 font-medium text-gray-600 "></p>
      </div>
      {/* Websites */}
      <div className="flex flex-wrap justify-center gap-5 pb-10 ">
        <div className="flex  h-9 w-28 animate-pulse items-center gap-2 rounded-lg bg-navy-700 text-sm"></div>
        <div className="flex  h-9 w-28 animate-pulse items-center gap-2 rounded-lg bg-navy-700 text-sm"></div>
        <div className="flex  h-9 w-28 animate-pulse items-center gap-2 rounded-lg bg-navy-700 text-sm"></div>
        <div className="flex  h-9 w-28 animate-pulse items-center gap-2 rounded-lg bg-navy-700 text-sm"></div>
      </div>
      {/* Summary */}
      <div className="h-full w-full rounded-xl bg-navy-800 p-10">
        <p className="mb-5 h-6 w-72 animate-pulse rounded-lg bg-navy-700 text-xl font-semibold text-white"></p>
        <p className="mb-3 h-5 w-full animate-pulse rounded-lg bg-navy-700 text-xl font-semibold text-white"></p>
        <p className="mb-3 h-5 w-3/4 animate-pulse rounded-lg bg-navy-700 text-xl font-semibold text-white"></p>
        <p className="h-5 w-2/4 animate-pulse rounded-lg bg-navy-700 text-xl font-semibold text-white"></p>
      </div>
    </div>
  );
}
