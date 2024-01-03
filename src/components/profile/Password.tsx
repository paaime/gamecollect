import Card from 'components/card';

const Password = () => {
  return (
    <Card extra={'w-full p-6 h-full'}>
      <div className="mb-8 w-full">
        <p className="text-xl font-bold text-navy-700 dark:text-white">
          Change password
        </p>
        <p className="mt-2 text-base text-gray-600">
          Here you can set your new password
        </p>
      </div>
      {/* Settings form */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label className="ml-3 text-sm font-bold" htmlFor="">
            Old Password
          </label>
          <input
            className="rounded-2xl border border-navy-700 bg-navy-800 p-3 px-4 text-sm outline-none"
            type="text"
            placeholder="email@example.com"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="ml-3 text-sm font-bold" htmlFor="">
            New Password
          </label>
          <input
            className="rounded-2xl border border-navy-700 bg-navy-800 p-3 px-4 text-sm outline-none"
            type="text"
            placeholder="Adela Parkson"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="ml-3 text-sm font-bold" htmlFor="">
            New Password Confirmation
          </label>
          <input
            className="rounded-2xl border border-navy-700 bg-navy-800 p-3 px-4 text-sm outline-none"
            type="text"
            placeholder="Adela Parkson"
          />
        </div>
      </div>
      {/* Submit button */}
      <div className="mt-8 flex justify-end">
        <button className="animate rounded-2xl bg-brand-400 px-8 py-3 text-sm font-medium transition-all hover:bg-brand-500">
          Save Changes
        </button>
      </div>
    </Card>
  );
};

export default Password;
