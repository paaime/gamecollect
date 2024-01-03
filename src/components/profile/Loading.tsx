import Card from 'components/card';

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      <div className="mt-3 flex h-fit w-full flex-col gap-5">
        <div className="col-span-6 lg:!mb-0">
          <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
            {/* Background and profile */}

            <div className="relative h-44 w-full overflow-hidden  rounded-2xl">
              <div className="mb-3 h-full w-full rounded-2xl bg-navy-700 object-cover" />
            </div>
            <div className="align-items-center -mt-28 mb-3 flex justify-evenly">
              <div className="group relative rounded-full bg-navy-900">
                <div className="relate h-48 w-48 animate-pulse rounded-full border-8 border-navy-900" />
              </div>
            </div>

            {/* Name and position */}
            <div className="mb-2 mt-2 flex animate-pulse flex-col items-center">
              <h4 className="h-8 w-60 rounded-lg bg-navy-900 text-2xl font-bold text-navy-700 dark:text-white"></h4>
              <h5 className="mt-2 h-7 w-40 rounded-lg bg-navy-900 text-base font-normal text-gray-600"></h5>
            </div>
          </Card>
        </div>
      </div>
      {/* all project & ... */}

      <div className="mb-4 grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 h-fit lg:col-span-6 lg:mb-0 3xl:col-span-6">
          <Card extra={'w-full p-6 h-full'}>
            <div className="mb-8 w-full animate-pulse">
              <p className="h-8 w-40 rounded-lg bg-navy-900 text-xl font-bold text-navy-700 dark:text-white"></p>
              <p className="mt-5 h-7 w-full rounded-lg bg-navy-900 text-base text-gray-600"></p>
              <p className="mt-3 h-7 w-full rounded-lg bg-navy-900 text-base text-gray-600"></p>
              <p className="mt-3 h-7 w-full rounded-lg bg-navy-900 text-base text-gray-600"></p>
            </div>
            {/* Settings form */}

            {/* Submit button */}
          </Card>
        </div>
        <div className="col-span-5 h-fit lg:col-span-6 lg:mb-0 3xl:col-span-6">
          <Card extra={'w-full p-6 h-full'}>
            <div className="mb-8 w-full animate-pulse">
              <p className="h-8 w-40 rounded-lg bg-navy-900 text-xl font-bold text-navy-700 dark:text-white"></p>
              <p className="mt-5 h-7 w-full rounded-lg bg-navy-900 text-base text-gray-600"></p>
              <p className="mt-3 h-7 w-full rounded-lg bg-navy-900 text-base text-gray-600"></p>
              <p className="mt-3 h-7 w-full rounded-lg bg-navy-900 text-base text-gray-600"></p>
            </div>
            {/* Settings form */}

            {/* Submit button */}
          </Card>
        </div>
      </div>
    </div>
  );
}
